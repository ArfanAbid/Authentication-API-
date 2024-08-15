import React from 'react'
import { ModeToggle } from '@/components/Mode-toggle'


function Header() {
  return (
    <>
    <div className='flex justify-between p-4'>
        <div className='text-xl'>Hello <span className='text-[#48e1b1]  font-semibold'>User</span></div>
        <div><ModeToggle /></div>
    </div>
    </>
  )
}

export default Header