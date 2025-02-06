import React from 'react'
import { BsFillClipboardDataFill } from "react-icons/bs";


const doctors = () => {
  return (
    <div>
        <div className='fixed bottom-0 left-0 hidden md:block'>
                <div className="drawer">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer" className="btn drawer-button bg-transparent shadow-none"><BsFillClipboardDataFill size={20} className='text-[#1A2238]' /></label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                            <li><a>Sidebar Item 1</a></li>
                            <li><a>Sidebar Item 2</a></li>
                            <li>
                                <div className=' display inline mt-16'>
                                    <p className=' text-center text-base'><b>Dr Queency Gonsalves</b></p>
                                    <p className=' text-center font-semibold pt-4'>MBBS from GMC Jalgaon</p>
                                    <p className=' text-center pt-2'>Intern at Government Hospital Jalgaon</p>
                                </div>
                            </li>
                            <li>
                                <div className=' display inline mt-20'>
                                    <p className=' text-center text-base'><b>Dr Sonam Singh</b></p>
                                    <p className=' text-center font-semibold pt-4'>MBBS from GMC Jalgaon</p>
                                    <p className=' text-center pt-2'>Intern at Government Hospital Jalgaon</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default doctors