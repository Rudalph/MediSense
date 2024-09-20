"use client"
import React, { useState } from 'react';
import { Button } from "../../Components/ui/button";
import { Input } from "../../Components/ui/input";
import { RiSendPlaneFill } from "react-icons/ri";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "../../Components/ui/drawer";
import { RiRobot2Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import Image from 'next/image';

const Page = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false)
  const [loader, setLoader] = useState(false)

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSummarizeClick = async () => {
    if (!file) {
      console.log('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    setLoader(true);
    try {
      // https://medisense-backend.onrender.com
      // http://localhost:5000/upload
      const response = await fetch('https://medisense-backend.onrender.com/upload', {
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
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5003/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const answer = data.recommendations.replace(/[\*>#]/g, '')
      setChatHistory([...chatHistory, { question, answer}]);
      console.log(answer);
      setQuestion(""); 
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className='mt-24 lg:mt-32 flex justify-center lg:gap-10 items-center align-middle gap-5 mx-1'>
        <Input
          id="picture"
          type="file"
          className="w-full max-w-xs border border-[#182C4E] p-2"
          onChange={handleFileChange}
        />
        <Button type="submit" className={`border border-[#182C4E] text-[#182C4E] bg-transparent font-bold hover:bg-[#182C4E] hover:text-white ${loader ? 'bg-[#182C4E]' : ''}`} onClick={handleSummarizeClick}>{loader ? <Image src="/loader.gif" alt='' height={30} width={30} className=' font-extrabold text-lg'/> : 'Upload' }</Button>
        {showDrawer ? <Drawer>
          <DrawerTrigger className='border border-[#182C4E] bg-transparent font-bold hover:bg-[#182C4E] hover:text-white p-2 rounded-md'>Summarize</DrawerTrigger>
          <DrawerContent className='bg-white'>
            <DrawerHeader>
              <DrawerTitle className='text-[#D45028]'>Summary Of Your Report</DrawerTitle>
            </DrawerHeader>
            <div className='p-10'>
              {summary}
            </div>
            <DrawerClose>
              <Button variant="outline" className='border border-[#D45028] text-[#D45028] bg-transparent hover:bg-[#D45028] hover:text-[white] font-bold mb-4'>Close</Button>
            </DrawerClose>
          </DrawerContent>
        </Drawer> : '' }
        
      </div>

      <div className='w-full fixed bottom-0 flex justify-center align-middle items-center mb-5 lg:mb-10 px-1'>
        <div className="flex w-full max-w-3xl items-center space-x-2 relative">
          <Input
            type="text"
            placeholder="Ask your medical doubts...."
            value={question}
            onChange={handleQuestionChange}
            className="p-6 border border-[#182C4E] focus:border-[#182C4E] "
          />
          <Button
            type="button"
            onClick={handleSubmit}
            className="absolute right-1 px-2 py-1 bg-transparent hover:bg-transparent text-[#182C4E]"
          >
            <RiSendPlaneFill size={27} />
          </Button>
        </div>
      </div>

      <div className='mt-10'>
        {/* Chat bubbles */}
        <div className="chat chat-start">
          <div className="chat-header">
          </div>
        </div>
        <div className='mt-10 flex justify-center overflow-hidden'>
          <div className='mt-10 w-4/5 items-center align-middle overflow-y-auto style={{ maxWidth: 100%, maxHeight: 100vh }}'>
            {chatHistory.map((chat, index) => (
              <div key={index}>
                <div className="chat chat-start">
                  <div className="chat-image avatar">
                    <div className=" w-32rounded-full text-[#182C4E]">
                      <RiRobot2Line size={50} />
                    </div>
                  </div>
                  <div className="chat-bubble bg-[#DEF8ED] text-black">{chat.question}</div>
                </div>

                <div className="chat chat-end p-5">
                  <div className="chat-image avatar">
                    <div className=" w-32rounded-full text-[#182C4E]">
                      <FaRegUser size={50} />
                    </div>
                  </div>
                  <div className="chat-bubble bg-[#DEF8ED] text-black">{chat.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;