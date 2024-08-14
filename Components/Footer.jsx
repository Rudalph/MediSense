"use client"
import React from 'react'
import { Linkedin, Instagram, Facebook} from 'lucide-react';

export default function Footer() {
  return (
    <section className="relative overflow-hidden bg-[#1A2238] py-8 bottom-0">
      <div className="container relative z-10 mx-auto px-4">
        <div className="-m-8 flex flex-wrap items-center justify-between">
          <div className="w-auto p-8">
            <a href="#">
              <div className="inline-flex items-center">
                <span className="ml-4 text-2xl font-bold flex">
                    <p className='text-white'>Medi </p><p className='text-[#D45028]'>Sense</p>
                </span>
              </div>
            </a>
          </div>
          <div className="w-auto p-8">
            <ul className="-m-5 flex flex-wrap items-center">
              <li className="p-5">
                <a className="font-medium text-white hover:text-[#D45028]" href="#">
                  Privacy Policy
                </a>
              </li>
              <li className="p-5">
                <a className="font-medium text-white hover:text-[#D45028]" href="#">
                  Terms of Service
                </a>
              </li>
              <li className="p-5">
                <a className="font-medium text-white hover:text-[#D45028]" href="#">
                  Return Policy
                </a>
              </li>
              <li className="p-5">
                <a className="font-medium text-white hover:text-[#D45028]" href="#">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className="w-auto p-8">
            <div className="-m-1.5 flex flex-wrap">
              <div className="w-auto p-1.5">
                <a href="#">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 p-1 text-white">
                   
                      <Linkedin size={20}/>
                    
                  </div>
                </a>
              </div>
              <div className="w-auto p-1.5">
                <a href="#">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 p-1 text-white">
                    <Instagram size={20}/>
                  </div>
                </a>
              </div>
              <div className="w-auto p-1.5">
                <a href="#">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 p-1 text-white">
                    <Facebook />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
