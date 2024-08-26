"use client"
import React, { useState } from 'react';
import { Button } from "../../Components/ui/button";
import { Input } from "../../Components/ui/input";
import { RiSendPlaneFill } from "react-icons/ri";
import { BsFillClipboardDataFill } from "react-icons/bs";
import { LuNewspaper } from "react-icons/lu";




const Page = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [data, setData] = useState([]);

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleSubmit = async () => {
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
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log(result);

            // Assuming 'result' is the array you provided in the question
            setData(result);

            setAnswer(result.answer); // Adjust this if necessary
            setChatHistory([...chatHistory, { question, answer: result.answer }]);
            setQuestion(""); // Clear input after submission
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <div className='fixed bottom-0 left-0 hidden md:block'>
                <div className="drawer">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer" className="btn drawer-button bg-transparent shadow-none"><BsFillClipboardDataFill size={20} className='text-[#1A2238]' /></label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                            <li><a>Sidebar Item 1</a></li>
                            <li><a>Sidebar Item 2</a></li>
                            <li>
                                <div className=' display inline mt-16'>
                                    <p className=' text-center text-base'><b>Dr Queency Gonsalves</b></p>
                                    <p className=' text-center font-semibold pt-4'>MBBS from GMC Jalgaon</p>
                                    <p className=' text-center pt-2'>Intern at Government Hospital Jalgaon</p>
                                </div>
                            </li>
                            <li>
                                <div className=' display inline mt-20'>
                                    <p className=' text-center text-base'><b>Dr Sonam Gupta</b></p>
                                    <p className=' text-center font-semibold pt-4'>MBBS from GMC Jalgaon</p>
                                    <p className=' text-center pt-2'>Intern at Government Hospital Jalgaon</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

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
                        <RiSendPlaneFill size={27} />
                    </Button>
                </div>
            </div>

            <div className='fixed bottom-0 right-0 hidden md:block'>
                <div className="drawer drawer-end">
                    <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-4" className="btn drawer-button bg-transparent shadow-none"><LuNewspaper size={20} className='text-[LuNewspaper]' /></label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-auto min-h-full bg-base-200 text-base-content">
                            <li><a>Sidebar Item 1</a></li>
                            <li><a>Sidebar Item 2</a></li>
                            <li><div className="card w-96 bg-base-100 shadow-xl m-4">
                                <div className="card-body">
                                    <div className=' flex justify-normal'>
                                        <div className="avatar">
                                            <div className="mask mask-circle h-14 w-14">
                                                <img
                                                    src="https://th.bing.com/th/id/R.d4e2cbd37fba619ce8c0cc2fa3976046?rik=W0mXsqAkNIYChw&riu=http%3a%2f%2fwww.north-faceoutletonlines.net%2fwp-content%2fuploads%2f2020%2f05%2fasdfsdgasdfsdaf.jpg&ehk=yA2dnvKILMpFwLggXDfswKxo%2be3mVghczeZJ5oXSaNY%3d&risl=&pid=ImgRaw&r=0"
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <h2 className="card-title ml-2">Angan Medical</h2>
                                    </div>
                                    <p className='font-semibold'>Pharmacy</p>
                                    <p>Shop no 7, Poonam Arena, YK Nagar, Virar West, Virar, Maharashtra ·</p>
                                    <p>7030778747</p>
                                    <p className='text-green-500'>Open 24 Hours</p>
                                </div>
                            </div>
                            </li>

                            <li><div className="card w-96 bg-base-100 shadow-xl m-4">
                                <div className="card-body">
                                    <div className=' flex justify-normal'>
                                        <div className="avatar">
                                            <div className="mask mask-circle h-14 w-14">
                                                <img
                                                    src="https://th.bing.com/th/id/OIP.1SUdTBn8RGEd0aX6p0Pe_QHaJ4?w=480&h=640&rs=1&pid=ImgDetMain"
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <h2 className="card-title ml-2">Dev Balaji Medical</h2>
                                    </div>
                                    <p className='font-semibold'>Medical Supply</p>
                                    <p>Shop No 2,Ostwal Nagari, Central Park Road, Nalasopara, Maharashtra</p>
                                    <p>7249735828</p>
                                    <p className='text-green-500'>Open 24 Hours</p>
                                </div>
                            </div>
                            </li>


                            <li><div className="card w-96 bg-base-100 shadow-xl m-4">
                                <div className="card-body">
                                    <div className=' flex justify-normal'>
                                        <div className="avatar">
                                            <div className="mask mask-circle h-14 w-14">
                                                <img
                                                    src="https://th.bing.com/th/id/OIP.KDgF5j4N1cXbLrazvJopOwHaHa?w=600&h=600&rs=1&pid=ImgDetMain"
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <h2 className="card-title ml-2">Sahyog Medical</h2>
                                    </div>
                                    <p className='font-semibold'>Pharmacy</p>
                                    <p>B/C-31, Dube Estate, Nalasopara, Thane, Maharashtra 401209 · 1.2 km</p>
                                    <p>9970851627</p>
                                    <p className='text-green-500'>Open 24 Hours</p>
                                </div>
                            </div>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>

            <div className='mt-24'>
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
                                    <div className="modal-action">
                                        <form method="dialog">
                                            <button className="rounded-md bg-[#D45028] px-3 py-2 text-sm font-semibold text-white shadow-sm m-1">Submit</button>
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
