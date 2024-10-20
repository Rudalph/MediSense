import React from 'react'
import Image from 'next/image'

export default function Team() {
    return (
        <div className="mx-auto max-w-7xl lg:max-w-full px-2 md:px-0 mt-24 lg:mt-20 lg:mb-10">
            <div className="my-4">
                <h1 className="flex justify-center text-3xl font-bold lg:text-5xl">Our Team</h1>
                <br />
                <div className='flex justify-center align-middle items-center'>
                    <p className=" mt-2 text-[#D45028] lg:text-lg lg:w-[50%] text-center">
                        Our team is dedicated to enhancing your health with passion and expertise, delivering innovative solutions
                        that prioritize your well-being and empower you to live a healthier life.
                    </p>
                </div>
                <br />
            </div>
            <div className="flex justify-center align-middle items-center flex-wrap gap-14">
                <div className="card card-compact bg-base-100 w-72 shadow-xl border border-solid border-[#1A2238]">
                    <figure className="overflow-hidden">
                        <img
                            src="/Sangeeta_Ma'am_Image.jpg"
                            alt="Shoes" 
                            className='h-64 w-full transition-transform duration-500 ease-in-out transform hover:scale-110'
                            />
                    </figure>
                    <div className="card-body h-28">
                        <h2 className="card-title text-[#1A2238]">Prof. Sangeeta Parshionikar</h2>
                        <p className='text-base text-[#D45028]'>Mentor - ME Electronics Engineering</p>
                    </div>
                </div>

                <div className="card card-compact bg-base-100 w-72 shadow-xl border border-solid border-[#1A2238]">
                    <figure className="overflow-hidden">
                        <img
                            src="/Rudalph_Image.jpg"
                            alt="Shoes"
                            className='h-64 w-full transition-transform duration-500 ease-in-out transform hover:scale-110'
                            />
                    </figure>
                    <div className="card-body h-28">
                        <h2 className="card-title text-[#1A2238]">Rudalph Gonsalves</h2>
                        <p className='text-base text-[#D45028]'>Team Leader - Full stack developer</p>
                    </div>
                </div>


                <div className="card card-compact bg-base-100 w-72 shadow-xl border border-solid border-[#1A2238]">
                    <figure className="overflow-hidden">
                        <img
                            src="/Shruti_Image.jpg"
                            alt="Shoes" 
                            className='h-64 w-full transition-transform duration-500 ease-in-out transform hover:scale-110'
                            />
                    </figure>
                    <div className="card-body h-28">
                        <h2 className="card-title text-[#1A2238]">Shruti Patil</h2>
                        <p className='text-base text-[#D45028]'>Team Member - Full stack developer</p>
                    </div>
                </div>


                <div className="card card-compact bg-base-100 w-72 shadow-xl border border-solid border-[#1A2238]">
                    <figure className="overflow-hidden">
                        <img
                            src="/Siddhesh_Image.jpg"
                            alt="Shoes" 
                            className='h-64 w-full transition-transform duration-500 ease-in-out transform hover:scale-110'
                            />
                    </figure>
                    <div className="card-body h-28">
                        <h2 className="card-title text-[#1A2238]">Siddhesh Pradhan</h2>
                        <p className='text-base text-[#D45028]'>Team Member - Full stack developer</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
