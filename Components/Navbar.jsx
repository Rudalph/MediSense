'use client'

import React from 'react'
import { Menu, X } from 'lucide-react'

const menuItems = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Report',
    href: '/Report',
  },
  {
    name: 'Prescription',
    href: '/Prescription',
  },
  {
    name: 'Advice',
    href: '#',
  },
  {
    name: 'Goals',
    href: '#',
  },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="w-full bg-[#1A2238] fixed top-0 z-50 pt-3 pb-3 lg:pt-5 lg:pb-5">
      <div className="mx-auto flex items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span className="font-bold flex text-2xl lg:text-4xl"><p className='text-[#FFFFFF]'>Medi</p><p className='text-[#D45028]'>Sense</p></span>
        </div>
        <div className="hidden lg:block">
          <ul className="inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-lg font-extrabold text-white hover:text-[#D45028]"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer text-white" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-[#1A2238] shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span className="font-bold flex"><p className='text-[#FFFFFF] text-xl'>Medi</p><p className='text-[#D45028] text-xl'>Sense</p></span>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-white "
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-[#D45028]"
                      >
                        <span className="ml-3 text-base font-medium text-white">
                          {item.name}
                        </span>
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
