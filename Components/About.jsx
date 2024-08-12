'use client'
import React, { useRef, useEffect } from 'react'
import Typed from 'typed.js';

export default function About() {
    const typingRef = useRef(null);

    useEffect(() => {
        const options = {
            strings: [
                'MediSense',
            ],
            typeSpeed: 50,
            backSpeed: 50,
            backDelay: 3000,
            loop: true,
            showCursor: true,
        };

        const typingInstance = new Typed(typingRef.current, options);

        return () => {
            typingInstance.destroy();
        };
    }, []);


    return (
        <section>
            <div className="px-2 lg:flex lg:flex-row lg:items-center lg:mt-16 lg:mb-16 text-center">
                <div className="w-full flex justify-center align-middle items-center">
                    <div className="my-10 lg:my-0">
                        <h2 className="text-3xl font-bold leading-tight text-[#1A2238] sm:text-4xl lg:text-5xl">
                            <span ref={typingRef} />
                            <br />
                        </h2>
                        <div className="mt-4 max-w-xl text-base leading-relaxed text-gray-600">
                            <p className="text-[#D45028] font-bold">Enlightening Health, Empowering Lives.</p> <br />
                            MediSense is an application-based health tech solution that implements the power of
                            artificial intelligence to efficiently overcome current flaws in the healthcare system.
                            Through Medisense we aim to educate and monitor users on their health conditions. To
                            obtain desired output we will be using Generative AI.
                        </div>

                        <form action="#" method="POST" className="mt-8 flex justify-center align-middle">
                            <div className="flex flex-col sm:flex-row sm:items-center">
                                <div className="flex w-full items-center space-x-2">
                                    <input
                                        className="flex h-10 lg:w-96 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                                        type="email"
                                        placeholder="Email"
                                    />
                                    <button
                                        type="button"
                                        className="rounded-md bg-[#D45028] px-3 py-2 text-sm font-semibold text-white shadow-sm"
                                    >
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
