"use client"
import React, { useState } from 'react';
import { Button } from "../../Components/ui/button";
import { Input } from "../../Components/ui/input";
import { RiSendPlaneFill } from "react-icons/ri";
import { BsFillClipboardDataFill } from "react-icons/bs";
import { LuNewspaper } from "react-icons/lu";
import { RiRobot2Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import Image from 'next/image';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../app/globals.css'

const Page = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loader, setLoader] = useState(false)

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async () => {
    if(question===''){
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
    }else{
    setLoader(true)
    try {
      //http://127.0.0.1:5003/bot
      //https://medisense-backend.onrender.com
      const response = await fetch('http://127.0.0.1:5000/bot', {
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
    //   const newAnswer = data.answer;

    const answer = data.answer;
    // Simultaneously start generating speech while fetching the answer
    const audioBlobPromise = generateSpeech(answer);
    // Wait for both the answer and the audio blob to be ready
    const [audioBlob] = await Promise.all([audioBlobPromise]);

      setAnswer(data.answer);
      setChatHistory([...chatHistory, { question, answer: data.answer }]);
      setLoader(false)
      setQuestion(""); // Clear input after submission

      // Play the audio after everything is ready
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play(); // Play the audio

    //    // After fetching the answer, generate speech using Eleven Labs API
    //   await generateAndPlaySpeech(newAnswer);
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
      console.error('Error:', error);
    }
  }
};

  // Function to call Eleven Labs API and play the audio
//   const generateAndPlaySpeech = async (text) => {
//     const apiKey = 'sk_b997b029fd7e97a483b054b9fff5808de21ec6664eb3932e';
//     const url = 'https://api.elevenlabs.io/v1/text-to-speech/pMsXgVXv3BLzUgSXRplE';

//     const headers = {
//       'Accept': 'audio/mpeg',
//       'Content-Type': 'application/json',
//       'xi-api-key': apiKey
//     };

//     const data = {
//       text,
//       model_id: 'eleven_monolingual_v1',
//       voice_settings: {
//         stability: 0.5,
//         similarity_boost: 0.5
//       }
//     };

//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers,
//         body: JSON.stringify(data)
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch audio');
//       }

//       // Convert response to blob and create an audio object
//       const audioBlob = await response.blob();
//       const audioUrl = URL.createObjectURL(audioBlob);
//       const audio = new Audio(audioUrl);
//       audio.play(); // Play the audio
//     } catch (error) {
//       console.error('Error generating and playing speech:', error);
//     }
//   };

// Function to call Eleven Labs API and return the audio blob
////Elevenlabs API KEY - medi-sense-1 - crce.9567: sk_782c8137e7a98a20c6b35fbd2020034ae535f388f26866e3
const generateSpeech = async (text) => {
    const apiKey = 'sk_782c8137e7a98a20c6b35fbd2020034ae535f388f26866e3';
    const url = 'https://api.elevenlabs.io/v1/text-to-speech/pMsXgVXv3BLzUgSXRplE';

    const headers = {
      'Accept': 'audio/mpeg',
      'Content-Type': 'application/json',
      'xi-api-key': apiKey
    };

    const data = {
      text,
      model_id: 'eleven_monolingual_v1',
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.5
      }
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        toast.info('Failed to fetch audio', {
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
        throw new Error('Failed to fetch audio');
      }

      // Convert response to blob (return this blob for use later)
      return await response.blob();
    } catch (error) {
      toast.error('Error generating speech', {
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
      console.error('Error generating speech:', error);
    }
  };


  return (
    <div>

      <div className='mt-10'>
        
        <div className=' lg:mt-24 flex justify-center overflow-hidden'>
          
          <div className='mt-10 lg:w-4/5 items-center align-middle h-[500px] overflow-y-scroll no-scrollbar mb-20'>
          {!answer && (
            <div className='flex justify-center align-middle items-center lg:mt-20 mt-28 opacity-70'>
            <img src="https://hrsoftbd.com/assets/servicePhoto/onlinedoctor_20221117111818.gif" alt="" className='h-[400px]'/>
          </div>
          ) }
          
            {chatHistory.map((chat, index) => (
              <div key={index}>
                <div className="chat chat-start p-5">
                  <div className="chat-image avatar">
                    <div className=" w-32rounded-full text-[#182C4E]">
                    <FaRegUser size={35} />
                    </div>
                  </div>
                  <div className="chat-bubble bg-[#D1E9F6] text-[#182C4E] font-medium border-2 border-[#182C4E]">{chat.question}</div>
                </div>

                <div className="chat chat-end p-5">
                  <div className="chat-image avatar">
                    <div className=" w-32rounded-full text-[#182C4E]">
                      <RiRobot2Line size={40} />
                    </div>
                  </div>
                  <div className="chat-bubble bg-[#D1E9F6] text-[#182C4E] font-medium border-2 border-[#182C4E]">{chat.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='w-full fixed bottom-0 flex justify-center align-middle items-center lg:mb-10 mb-5 px-2'>
      
        <div className="flex w-full max-w-3xl items-center space-x-2 relative">
          <Input
            type="text"
            placeholder="Ask your medical doubts...."
            value={question}
            onChange={handleQuestionChange}
            className="p-6 border border-gray-300"
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit();  // Trigger handleSubmit when Enter is pressed
                }
              }}
          />
          <Button
            type="button"
            onClick={handleSubmit}
            className="absolute right-1 px-2 py-1 bg-transparent hover:bg-transparent text-[#182C4E]"
          >
            {loader ? <Image src="/loader_blue.gif" alt='' height={30} width={30} className=' font-extrabold text-lg'/> : <RiSendPlaneFill size={27} /> }
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
