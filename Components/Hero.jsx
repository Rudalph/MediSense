import React from 'react'
import Image from 'next/image'

export default function Hero() {
  return (
    <div className="relative w-full bg-[#1A2238] mt-10 lg:mt-20 lg:pb-20 pb-10" style={{ clipPath: "ellipse(100% 100% at 50% 0)" }}>
      <div className="mx-auto lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
          
          <div className="mt-8 flex max-w-max items-center space-x-2 rounded-full bg-gray-100 p-1">
            <div className="rounded-full bg-white p-1">
              <p className="text-sm font-medium">Get Started With MediSense </p>
            </div>
            <p className="text-lg font-bold"><a href="https://medi-sense.vercel.app">&rarr;</a></p>
          </div>
          <h1 className="mt-8 text-3xl font-bold tracking-tight text-[#9daaf2] md:text-4xl lg:text-6xl">
            MediSense
          </h1>
          <div className="mt-8 lg:text-2xl text-white text-lg">
            <p className='text-[#D45028] font-semibold'>Enlightening Health, Empowering Lives.</p> <br />MediSense is an advanced health tech application developed using generative AI
          </div>
          {/* <form action="" className="mt-8 flex items-start space-x-2">
            <div>
              <input
                className="flex w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="email"
                placeholder="Enter your email"
                id="email"
              ></input>
              <p className="mt-2 text-sm text-gray-500">We care about your privacy</p>
            </div>
            <div>
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Subscribe
              </button>
            </div>
          </form> */}
        </div>
        <div className="relative lg:col-span-5 xl:col-span-6 flex justify-center align-middle items-center p-5 lg:p-0">
          <Image
            className="lg:ml-40"
            src="/Healthcare_Main_Image.png"
            alt=""
            height={400}
            width={400}
          />
        </div>
      </div>
    </div>
  )
}
