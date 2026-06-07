"use client"
import React, { useState } from 'react';
import { Button } from "../../Components/ui/button";
import { Input } from "../../Components/ui/input";
import { RiSendPlaneFill } from "react-icons/ri";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "../../Components/ui/drawer";
import { RiRobot2Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import Image from 'next/image';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../app/globals.css'


const Page = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false)
  const [loader, setLoader] = useState(false)
  const [ans, SetAns] = useState("")


  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSummarizeClick = async () => {
    if (!file) {
      console.log('No file selected');
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

    const formData = new FormData();
    formData.append('file', file);
    setLoader(true);
    try {
      // https://medisense-backend.onrender.com
      // http://localhost:5000/upload
      const response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.summary);
        const cleanedSummary = data.summary.replace(/[*#]/g, '');
        console.log(cleanedSummary);
        setSummary(cleanedSummary);
        setLoader(false);
        setShowDrawer(true);
      } else {
        console.error('Error:', response.statusText);
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
      }
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
      console.error('Error:', error.message);
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/savefolder", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("File uploaded successfully!");
      } else {
        alert("File upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file.");
    }


  };

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
      try {
        const response = await fetch('http://127.0.0.1:5000/ask', {
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
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const answer = data.answer.replace(/[\*>#]/g, '')
        SetAns(answer)
        setChatHistory([...chatHistory, { question, answer }]);
        console.log(answer);
        setQuestion("");
      } catch (error) {
        console.log('Error:', error);
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
      }
    }
  };

  return (

<div className="flex flex-col min-h-screen px-4 relative">
  {/* Toast Container */}
  <ToastContainer
    progressClassName="toastProgress"
    bodyClassName="toastBody"
  />
  
  {/* File Upload and Summary Section */}
  <div className="mt-20 lg:mt-28 flex flex-wrap justify-center items-center gap-4 mb-6">
    <Input
      id="picture"
      type="file"
      className="w-full max-w-xs border border-[#182C4E] p-2"
      onChange={handleFileChange}
    />
    <Button 
      type="submit" 
      className={`border border-[#182C4E] text-[#182C4E] bg-transparent font-bold hover:bg-[#182C4E] hover:text-white ${loader ? 'bg-[#182C4E]' : ''}`} 
      onClick={handleSummarizeClick}
    >
      {loader ? <Image src="/loader.gif" alt='' height={30} width={30} className='font-extrabold text-lg' /> : 'Upload'}
    </Button>
    
    {showDrawer ? 
      <Drawer>
        <DrawerTrigger className="border border-[#182C4E] bg-transparent font-bold hover:bg-[#182C4E] hover:text-white p-2 rounded-md">
          Summarize
        </DrawerTrigger>
        
        <DrawerContent className="bg-white">
          <DrawerHeader>
            <DrawerTitle className="text-[#D45028]">Summary Of Your Report</DrawerTitle>
          </DrawerHeader>
          <div className="p-10">
            {summary}
          </div>
          <DrawerClose>
            <Button 
              variant="outline" 
              className="border border-[#D45028] text-[#D45028] bg-transparent hover:bg-[#D45028] hover:text-white font-bold mb-4"
            >
              Close
            </Button>
          </DrawerClose>
        </DrawerContent>
      </Drawer> 
    : ''}
  </div>

  {/* Chat Messages Container */}
  <div className="flex-grow w-full max-w-6xl mx-auto mb-24 overflow-y-scroll no-scrollbar">
    {!ans ? (
      <div className="flex justify-center items-center h-[400px]">
        <img 
          src="https://hrsoftbd.com/assets/servicePhoto/onlinedoctor_20221117111818.gif" 
          alt="Loading animation" 
          className="h-[350px] opacity-70" 
        />
      </div>
    ) : (
      <div className="w-full h-[calc(100vh-300px)] relative ">
        <div className="absolute inset-0 p-2 overflow-y-scroll no-scrollbar">
          <div className="h-full  w-full overflow-y-scroll no-scrollbar">
            {chatHistory.map((chat, index) => (
              <div key={index}>
                <div className="chat chat-start p-4">
                  <div className="chat-image avatar">
                    <div className="w-10 text-[#182C4E]">
                      <FaRegUser size={30} />
                    </div>
                  </div>
                  <div className="chat-bubble bg-[#D1E9F6] text-[#182C4E] font-medium border-2 border-[#182C4E]">
                    {chat.question}
                  </div>
                </div>

                <div className="chat chat-end p-4">
                  <div className="chat-image avatar">
                    <div className="w-10 text-[#182C4E]">
                      <RiRobot2Line size={35} />
                    </div>
                  </div>
                  <div className="chat-bubble bg-[#D1E9F6] text-[#182C4E] font-medium border-2 border-[#182C4E]">
                    {chat.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
  </div>

  {/* Input Area - Fixed at Bottom */}
  <div className="w-full fixed bottom-0 left-0 right-0 flex justify-center items-center py-4 px-4 bg-white/80 backdrop-blur-sm">
    <div className="flex w-full max-w-3xl items-center space-x-2 relative">
      <Input
        type="text"
        placeholder="Ask your medical doubts...."
        value={question}
        onChange={handleQuestionChange}
        className="p-6 border border-[#182C4E] focus:border-[#182C4E]"
      />
      <Button
        type="button"
        onClick={handleSubmit}
        className="absolute right-3 px-2 py-1 bg-transparent hover:bg-transparent text-[#182C4E]"
      >
        <RiSendPlaneFill size={27} />
      </Button>
    </div>
  </div>
</div>
  );
};

export default Page;