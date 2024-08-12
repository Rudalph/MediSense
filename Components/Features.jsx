import React from 'react'
import { Pill, FileText, Handshake, Goal, BotMessageSquare } from 'lucide-react'

export default function Features() {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 mt-20 mb-10">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto inline-flex rounded-full bg-gray-100 px-4 py-1.5">
          <p className="text-sm font-bold uppercase tracking-widest text-[#1A2238]">
            Features of MediSense
          </p>
        </div>
        <h2 className="mt-6 text-3xl font-bold leading-tight text-[#1A2238] sm:text-4xl lg:text-5xl">
          What Features Do We Provide?
        </h2>
        <p className="mt-4 text-base leading-relaxed text-[#D45028]">
           Below mentioned are the features of Medisense. Through our features we aim to educate indivisual and develop 
           better understanding of medical terminologies.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-y-8 text-center sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
        <div>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#D1E9F6]">
            <Pill className="h-9 w-9 text-[#1A2238]" />
          </div>
          <h3 className="mt-8 text-lg font-semibold text-[#D45028]">Prescription Analyzer</h3>
          <p className="mt-4 text-sm text-gray-600">
            Upload your prescription or search name of any medicine and get alternate medicines along with 
            names of pharmacies nearby you having those medicines in stock.
          </p>
        </div>
        <div>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#D1E9F6]">
            <FileText className="h-9 w-9 text-[#1A2238]" />
          </div>
          <h3 className="mt-8 text-lg font-semibold text-[#D45028]">Report Simplifier</h3>
          <p className="mt-4 text-sm text-gray-600">
            Upload your complex medical report and get summary of your report in seconds in easy to understand 
            language further your can talk to your report for better understanding.
          </p>
        </div>
        <div>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#D1E9F6]">
            <Handshake className="h-9 w-9 text-[#1A2238]" />
          </div>
          <h3 className="mt-8 text-lg font-semibold text-[#D45028]">Advice & Setting Goals</h3>
          <p className="mt-4 text-sm text-gray-600">
            Fill up basic form consisting of information like age, height, weight etc. and set your health Goals
            On submitting you will get recommendations to enhance your health condition. 
          </p>
        </div>
        <div>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#D1E9F6]">
            <Goal className="h-9 w-9 text-[#1A2238]" />
          </div>
          <h3 className="mt-8 text-lg font-semibold text-[#D45028]">Goal Tracking</h3>
          <p className="mt-4 text-sm text-gray-600">
            You can graphically visualize the goals the you have set for yourself and self analyze if you are alinged
            with your goals or diverted.
          </p>
        </div>
        <div>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#D1E9F6]">
            <BotMessageSquare className="h-9 w-9 text-[#1A2238]" />
          </div>
          <h3 className="mt-8 text-lg font-semibold text-[#D45028]">Goal Tracking</h3>
          <p className="mt-4 text-sm text-gray-600">
            A humanized virtual assistance that is capable of answering almost all of your medical queries. We assure 
            that this bot is trained on authentic medical resoures making it safe to use and reliable.
          </p>
        </div>
      </div>
    </div>
  )
}
