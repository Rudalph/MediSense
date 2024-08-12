import React from 'react'
import Image from 'next/image'

export default function Team() {
    return (
        <div className="mx-auto max-w-7xl px-2 md:px-0 lg:mt-20 lg:mb-10">
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
            <div className="grid grid-cols-1 gap-[30px] md:grid-cols-4">
                <div className="flex flex-col items-center text-start">
                    <div
                        className="relative flex h-[342px] w-full flex-col justify-end rounded-[10px] bg-red-300"
                        style={{
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                        <Image
                            src="/logo.jpg"
                            alt=""
                            className="z-0 h-full w-full rounded-[10px] object-cover"
                            height={342}
                            width={600}
                        />
                        <div className="absolute bottom-4 left-4">
                            <h1 className="text-xl font-semibold text-white">Prof. Sangeeta P.</h1>
                            <h6 className="text-base text-white">Mentor</h6>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center text-start">
                    <div
                        className="relative flex h-[342px] w-full flex-col justify-end rounded-[10px] bg-red-300"
                        style={{
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                        <Image
                            src="/logo.jpg"
                            alt=""
                            className="z-0 h-full w-full rounded-[10px] object-cover"
                            height={342}
                            width={600}
                        />
                        <div className="absolute bottom-4 left-4">
                            <h1 className="text-xl font-semibold text-white">Rudalph Gonsalves</h1>
                            <h6 className="text-base text-white">Full stack developer</h6>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center text-start">
                    <div
                        className="relative flex h-[342px] w-full flex-col justify-end rounded-[10px] bg-red-300"
                        style={{
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                        <Image
                            src="/logo.jpg"
                            alt=""
                            className="z-0 h-full w-full rounded-[10px] object-cover"
                            height={342}
                            width={600}
                        />
                        <div className="absolute bottom-4 left-4">
                            <h1 className="text-xl font-semibold text-white">Shruti Patil</h1>
                            <h6 className="text-base text-white">Full stack developer</h6>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center text-start">
                    <div
                        className="relative flex h-[342px] w-full flex-col justify-end rounded-[10px] bg-red-300"
                        style={{
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                        <Image
                            src="/logo.jpg"
                            alt=""
                            className="z-0 h-full w-full rounded-[10px] object-cover"
                            height={342}
                            width={600}
                        />
                        <div className="absolute bottom-4 left-4">
                            <h1 className="text-xl font-semibold text-white">Siddhesh Pradhan</h1>
                            <h6 className="text-base text-white">Full stack developer</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
