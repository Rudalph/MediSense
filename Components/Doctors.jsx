import React from 'react'
import Image from 'next/image'

export default function Team() {
    return (
        <div className="mx-auto max-w-7xl px-2 md:px-0 mt-24 lg:mt-24 lg:mb-10 ">
            <div className="my-4">
                <h1 className="flex justify-center text-3xl font-bold lg:text-5xl">Our Experts</h1>
                <br />
                <div className='flex justify-center align-middle items-center'>
                    <p className=" mt-2 text-[#D45028] lg:text-lg lg:w-[50%] text-center">
                        Our team of expert doctors is committed to improving your health with unparalleled
                        dedication and knowledge. We bring innovative medical solutions that focus on your well-being,
                        empowering you to lead a healthier and more fulfilling life.
                    </p>
                </div>
                <br />
            </div>
            <div className="flex justify-center align-middle items-center flex-wrap gap-14 lg:gap-40">
                <div className="card card-compact bg-base-100 w-72 shadow-xl border border-solid border-[#1A2238]">
                    <figure className="overflow-hidden">
                        <img
                            src="/Doc1_Image.jpg"
                            alt="Shoes"
                            className='h-64 w-full transition-transform duration-500 ease-in-out transform hover:scale-110'
                        />
                    </figure>
                    <div className="card-body h-28">
                        <h2 className="card-title text-[#1A2238]">Dr. Queency Gonsalves</h2>
                        <p className='text-base text-[#D45028]'>MBBS - GMC Jalgaon</p>
                    </div>
                </div>

                <div className="card card-compact bg-base-100 w-72 shadow-xl border border-solid border-[#1A2238]">
                    <figure className="overflow-hidden">
                        <img
                            src="/logo.jpg"
                            alt="Shoes"
                            className='h-64 w-full transition-transform duration-500 ease-in-out transform hover:scale-110'
                        />
                    </figure>
                    <div className="card-body h-28">
                        <h2 className="card-title text-[#1A2238]">Dr. Sonam Singh</h2>
                        <p className='text-base text-[#D45028]'>MBBS - GMC Jalgaon</p>
                    </div>
                </div>

            </div>
        </div>
    )
}
