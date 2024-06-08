import React from 'react'
import MobileNav from './MobileNav'
import { getUserInfo } from '@/lib/actions/user.actions'
import avatar from '../../public/images/avatar-profile.png'
import { apiURL } from '@/lib/utils'


const Header = async () => {
    const user = await getUserInfo ()
    return (
        <header className="flex items-center justify-between px-4 py-6 bg-white shadow">
            <nav className="flex justify-between items-center">
            <div className="flex h-16 items-center justify-between p-5 shadow-creditCard sm:p-8 md:hidden">
          <MobileNav />
      </div>
            </nav>
            <div className='flex gap-2 pr-8'>
                <div className="w-12 h-12 rounded-sm ">
                    <img src={user.image?`${apiURL}/images/${user.image}`: avatar.src} alt="" className="object-cover h-full w-full rounded-full"/>
                  </div>
                  <div className='flex flex-col'>
                  <p className="font-semibold">{user.fullname}</p>
                    <p className="font-sm text-gray-400">{user.role}</p>
                </div>
            </div>
        </header>
    )
}

export default Header