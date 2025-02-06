"use client"
import React,{useState} from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../app/globals.css'

const Upload = () => {

    const [loader, setLoader] = useState(false)
    const handleFileChange = async (e) => {
        const file = e.target.files[0];  // Get the selected file
        if (file) {
            setLoader(true)
            console.log("Selected file:", file);

            // Create a FormData object to send the file
            const formData = new FormData();
            formData.append("file", file);

            try {
                // Make the POST request to upload the file to the server
                const response = await fetch("http://127.0.0.1:5000/upload_to_pinata", {
                    method: "POST",
                    body: formData,
                });

                // Handle the response from the server
                if (!response.ok) {
                    toast.error('File upload failed', {
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
                    throw new Error("File upload failed");
                }

                const data = await response.json();
                console.log("File uploaded successfully:", data);
                toast.info('File uploaded successfully', {
                    position: "top-right",
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
            } catch (error) {
                console.error("Error uploading file:", error);
                toast.error('Error uploading file', {
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
            }
        }
    };

    const handleClick = () => {
        document.getElementById("fileInput").click(); // Trigger hidden input on button click
    };
    return (
        <>
            <ToastContainer
                progressClassName="toastProgress"
                bodyClassName="toastBody"
            />
            <button onClick={handleClick} type='button' className="fixed bottom-4 right-4 flex items-center justify-center bg-[#1A2238] text-white h-12 w-12 rounded-full shadow-lg hover:w-32 transition-all duration-300 ease-in-out group">

                <span className="text-[#D45028] text-2xl font-bold transition-all duration-300 ease-in-out group-hover:translate-x-2 group-hover:hidden">
                    {loader ? <span className="loading loading-dots loading-md"></span> : '+' }
                </span>

                <span className="text-[#D45028] ml-2 text-sm font-bold opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 group-hover:block hidden">
                {loader ? <span className="loading loading-dots loading-md"></span> : 'Upload' }
                </span>

            </button>

            <input
                type="file"
                id="fileInput"
                accept=".pdf" // Restrict to PDF files
                onChange={handleFileChange}
                className="hidden"
            />
        </>
    )
}

export default Upload