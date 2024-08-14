import React from 'react'
import Image from 'next/image'

export default function Team() {
    return (
        <div className="mx-auto max-w-7xl px-2 md:px-0 lg:mt-24 lg:mb-10 mt-10">
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
            <div className="grid grid-cols-1 gap-[80px] md:grid-cols-3 lg:ml-28 lg:mr-28">
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
                            <h1 className="text-xl font-semibold text-white">Dr. Queency Gonsalves</h1>
                            <h6 className="text-base text-white">MBBS</h6>
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
                            <h1 className="text-xl font-semibold text-white">Dr. Sonam Gupta</h1>
                            <h6 className="text-base text-white">MBBS</h6>
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
                            <h1 className="text-xl font-semibold text-white">Dr. Shrushti Patil</h1>
                            <h6 className="text-base text-white">Physiotherapist</h6>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
