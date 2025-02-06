"use client"
import React, { useState } from 'react';
import { Button } from "../../Components/ui/button";
import { Input } from "../../Components/ui/input";
import { RiSendPlaneFill } from "react-icons/ri";

import Image from 'next/image';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../app/globals.css'
import Location from './location';
import Doctors from './doctors';



const Page = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false)
    const [loader2, setLoader2] = useState(false)
    const [file, setFile] = useState(null);

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleSubmit = async () => {
        if (question === '') {
            toast.warn('Field cannot be empty', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } else {
            setLoader(true)
            console.log(question)
            try {
                //https://medisense-backend.onrender.com
                //http://localhost:5001/brand
                const response = await fetch('https://medisense-backend.onrender.com/brand', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ question }),
                });

                if (!response.ok) {
                    toast.info('Network issue, Try again', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                    setLoader(false)
                    // throw new Error('Network response was not ok');
                    return;
                }

                const result = await response.json();
                console.log(result);

                // Assuming 'result' is the array you provided in the question
                setData(result);

                setAnswer(result.answer); // Adjust this if necessary
                setChatHistory([...chatHistory, { question, answer: result.answer }]);
                setQuestion(""); // Clear input after submission
                setLoader(false);
            } catch (error) {
                toast.error('Something went wrong, Try again', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                setLoader(false)
                console.error('Error:', error);
            }
        }
    };




    const handle = async (question) => {
        if (question === '') {
            toast.warn('Field cannot be empty', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } else {
            setLoader2(true)
            console.log(question)
            try {
                //https://medisense-backend.onrender.com
                //http://localhost:5001/brand
                const response = await fetch('https://medisense-backend.onrender.com/brand', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ question }),
                });
                console.log(response)

                if (!response.ok) {
                    toast.info('Network issue, Try again', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                    setLoader2(false)
                    // throw new Error('Network response was not ok');
                    return;
                }

                const result = await response.json();
                console.log(result);

                // Assuming 'result' is the array you provided in the question
                setData(result);

                setAnswer(result.answer); // Adjust this if necessary
                setChatHistory([...chatHistory, { question, answer: result.answer }]);
                setQuestion(""); // Clear input after submission
                setLoader2(false);
            } catch (error) {
                toast.error('Something went wrong, Try again', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                setLoader2(false)
                console.error('Error:', error);
            }
        }
    };


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const handleUpload = async () => {
        if (!file) {
            toast.warn('No file selected', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });    
            return;
        }
        setLoader2(true);
    
        // Create a FormData object to send the file
        const formData = new FormData();
        formData.append('file', file);
    
        try {
            // Send the file to the Flask backend
            //http://127.0.0.1:5004/genai-image
            //https://medisense-backend.onrender.com/genai-image
            const response = await fetch('https://medisense-backend.onrender.com/genai-image', {
                method: 'POST',
                body: formData,
            });
    
            const result = await response.json();
            console.log('Response from backend:', result.medicine_1);
    
            // Assuming 'result.medicine_1' contains the required question
            if (result.medicine_1) {
                // Use the result from the image API as the question for the first API
                //const questions = result.medicine_1.toUpperCase(); // Adjust if needed
                const question = "ROPARK"
                await handle(question); // Call your first API with this question
            } else {
                console.error('No valid question generated from image API response');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setLoader2(false);
        }
    };



    

    

    return (
        <div>
            <ToastContainer
                progressClassName="toastProgress"
                bodyClassName="toastBody"
            />

           <Doctors /> 

            <div className='w-full fixed bottom-0 flex justify-center align-middle items-center mb-5 px-5'>
                <div className="flex w-full max-w-3xl items-center space-x-2 relative">
                    <Input
                        type="text"
                        placeholder="Enter Brand Name"
                        value={question}
                        onChange={handleQuestionChange}
                        className="p-6 border border-gray-300 focus:border-gray-300"
                    />
                    <Button
                        type="button"
                        onClick={handleSubmit}
                        className="absolute right-1 px-2 py-1 bg-transparent hover:bg-transparent text-[#1A2238]"
                    >
                        {loader ? <Image src="/loader_blue.gif" alt='' height={30} width={30} className=' font-extrabold text-lg' /> : <RiSendPlaneFill size={27} />}

                    </Button>
                </div>
            </div>

           <Location />


            <div className='mt-24 lg:mt-28'>
                <div className="flex justify-center lg:gap-10 items-center align-middle gap-5 mx-1">
                    <Input
                        id="picture"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="max-w-xs border border-[#182C4E] p-2"
                    />
                    <Button type="submit" className={`border border-[#182C4E] text-[#182C4E] bg-transparent font-bold hover:bg-[#182C4E] hover:text-white ${loader2 ? 'bg-[#182C4E]' : ''}`} onClick={handleUpload}>{loader2 ? <Image src="/loader.gif" alt='' height={30} width={30} className=' font-extrabold text-lg' /> : 'Upload'}</Button>
                </div>
                <section className="mx-auto w-full max-w-7xl px-4 py-4">
                    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                        <div>
                            <h2 className="text-lg font-semibold">Customize Your Prescripion</h2>
                            <p className="mt-1 text-sm text-gray-700">
                                This is a list of medecines that have same generic names but are produced and manufactured
                                by different companies with other brand names.
                            </p>
                        </div>

                        <div>
                            <dialog id="my_modal_4" className="modal">
                                <div className="modal-box w-11/12 max-w-5xl">
                                    <h3 className="font-bold text-lg">Book your medication online</h3>
                                    <div className='mt-5'>
                                        <div className='flex justify-evenly flex-wrap'>
                                            <input type="text" placeholder="Full Name" className="input input-bordered w-full max-w-xs m-4" />
                                            <input type="number" placeholder="Contact" className="input input-bordered w-full max-w-xs m-4" />
                                        </div>
                                        <div className='flex justify-evenly flex-wrap'>
                                            <input type="text" placeholder="Medecine Details" className="input input-bordered w-full max-w-xs m-4" />
                                            <input type="number" placeholder="Quantity" className="input input-bordered w-full max-w-xs m-4" />
                                        </div>
                                        <div className='flex justify-evenly flex-wrap'>
                                            <input type="email" placeholder="Email" className="input input-bordered w-full max-w-xs m-4" />
                                            <input type="number" placeholder="Alternate Contact Number" className="input input-bordered w-full max-w-xs m-4" />
                                        </div>
                                        <div className='flex justify-evenly flex-wrap'>
                                            <input type="file" className="file-input file-input-bordered w-full max-w-xs m-4" />
                                            <input type="text" placeholder="State" className="input input-bordered w-full max-w-xs m-4" />
                                        </div>
                                        <div className='flex justify-evenly flex-wrap'>
                                            <input type="text" placeholder="City" className="input input-bordered w-full max-w-xs m-4" />
                                            <input type="number" placeholder="Pin Code" className="input input-bordered w-full max-w-xs m-4" />
                                        </div>
                                        <div className='flex justify-evenly flex-wrap'>
                                            <input type="text" placeholder="Address" className="input input-bordered w-full max-w-xs m-4" />
                                            <input type="number" placeholder="Landmark" className="input input-bordered w-full max-w-xs m-4" />
                                        </div>
                                    </div>
                                    <div className="modal-action flex justify-end align-middle items-center">
                                        <button className="btn border border-[#D45028] text-[#D45028] bg-transparent hover:bg-[#D45028] hover:text-[white] font-bold" onClick={() => {
                                            toast.info('Feature coming soon', {
                                                position: "bottom-left",
                                                autoClose: 5000,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                                theme: "light",
                                                transition: Bounce,
                                            });
                                        }}>Submit</button>
                                        <form method="dialog">
                                            <button className="btn border border-[#D45028] text-[#D45028] bg-transparent hover:bg-[#D45028] hover:text-[white] font-bold">Close</button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                            <button
                                type="button"
                                className="rounded-md bg-[#1A2238] px-3 py-2 text-sm font-semibold text-white shadow-sm"
                                onClick={() => document.getElementById('my_modal_4').showModal()}
                            >
                                Book Online
                            </button>
                        </div>
                    </div>
                    <div className="mt-6 flex flex-col px-5 lg:px-0">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-[#D45028] md:rounded-lg">
                                    <table className="min-w-full divide-y divide-[#D45028]">
                                        <thead className="bg-[#1A2238]">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-left text-sm font-bold text-[#D45028] w-1/6"
                                                >
                                                    Brand Name
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-left text-sm font-bold text-[#D45028] w-1/6"
                                                >
                                                    Generic Name
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-left text-sm font-bold text-[#D45028] w-1/6"
                                                >
                                                    Package
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-left text-sm font-bold text-[#D45028] w-1/6"
                                                >
                                                    Price
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-left text-sm font-bold text-[#D45028] w-1/6"
                                                >
                                                    Strength
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-left text-sm font-bold text-[#D45028] w-1/6"
                                                >
                                                    Company
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#D45028] bg-white">
                                            {data.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-900 w-1/6">
                                                        {item.brandName}
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-900 w-1/6">
                                                        {item.genericName}
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-900 w-1/6">
                                                        {item.packageName || 'N/A'}
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-900 w-1/6">
                                                        {item.price}
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-900 w-1/6">
                                                        {item.strength}
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-900 w-1/6">
                                                        {item.companyName}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Page;
