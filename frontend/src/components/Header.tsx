'use client'


import React from 'react'
import Image from 'next/image'
import MobileNav from './MobileNav'


function Header() {
    return (
        <header className="flex items-center justify-between px-4 py-6 bg-white shadow">
            <nav className="flex justify-between items-center">
            <div className="flex h-16 items-center justify-between p-5 shadow-creditCard sm:p-8 md:hidden">
        <div>
          <MobileNav />
        </div>
      </div>
            </nav>
            <div className='flex space-x-8'>
            <Image
                    src='/icons/shopping-bag.svg'
                    width={24}
                    height={24}
                    alt='shopping-bag icon' />
                <Image
                    src='/icons/profile.svg'
                    width={24}
                    height={24}
                    alt='profile icon' />

            </div>
        </header>
    )
}

export default Header