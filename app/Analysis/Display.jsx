"use client"
import React, { useEffect, useState } from 'react'
import '../../app/globals.css'

const gifLinks = [
    "https://cdn-icons-png.flaticon.com/512/11880/11880560.png"
];

const Display = () => {

    const [loader, setLoader] = useState(false)
    const [files, setFiles] = useState([]);
    const [analysisData, setAnalysisData] = useState(null);

    // Fetch IPFS files from the Flask server
    useEffect(() => {
        const fetchFiles = async () => {
            const response = await fetch('http://127.0.0.1:5000/get-ipfs-files');
            const data = await response.json();
            console.log(data)
            setFiles(data);
        };

        fetchFiles();
    }, []);




    const handleViewAnalysis = async (fileUrl) => {
        setLoader(true)
        try {
            const response = await fetch('http://127.0.0.1:5000/get_summary_analysis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ file_url: fileUrl }),
            });
            const analysisData = await response.json();
            setAnalysisData(analysisData);
            console.log('Analysis Data:', analysisData);
        } catch (error) {
            console.error('Error analyzing file:', error);
        }
       document.getElementById('rudalph').showModal()
       setLoader(false)
    };


    return (
        <div className='mt-20 ml-72'>
            <div className='flex justify-start flex-wrap gap-7'>
                {files.length > 0 ? (
                    files.map((file, index) => (
                        <div key={index} className='mb-4 w-64'>

                            <div className="border border-[#1A2238] rounded-lg">
                                <div className="flex items-start justify-between p-4">
                                    <div className="space-y-2">

                                        <img src={gifLinks[Math.floor(Math.random() * gifLinks.length)]} width={60} height={60} alt="" />
                                        <h4 className="text-gray-800 font-semibold">{file.file_name}</h4>
                                    </div>
                                    <a href={file.file_url}><button className="text-[#D45028] text-sm border border-[#1A2238] rounded-lg px-3 py-2 duration-150 hover:bg-gray-100">View Report</button></a>
                                </div>
                                <div className="py-5 px-4 border-t border-t-[#1A2238] text-right">
                                    <button className="text-[#1A2238] hover:text-[#D45028] text-sm font-medium" onClick={() => handleViewAnalysis(file.file_url)}>
                                        {loader ? <span className="loading loading-dots loading-md"></span> : 'View Analysis'}
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))
                ) : (
                    <p>Loading files...</p>
                )}
            </div>
            <dialog id="rudalph" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Report Summary</h3>
                    <div className="py-4">
                    {loader ? (
                        <p>Loading...</p>
                    ) : analysisData ? (
                        <div className="overflow-x-auto">
                            <table className="table-auto border-collapse border border-gray-300 w-full">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2">Parameter</th>
                                        <th className="border border-gray-300 px-4 py-2">Value</th>
                                        <th className="border border-gray-300 px-4 py-2">Remark</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(analysisData['Health Parameters']).map(([key, value]) => (
                                        <tr key={key}>
                                            <td className="border border-gray-300 px-4 py-2">{key}</td>
                                            <td className="border border-gray-300 px-4 py-2">{value.Value}</td>
                                            <td className="border border-gray-300 px-4 py-2">{value.Remark}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <p className="mt-4">Report Date: {analysisData['Report Date']}</p>
                        </div>
                    ) : (
                        <p>No data available</p>
                    )}
                    </div>
                </div>
            </dialog>
        </div>

    )
}

export default Display