import React from 'react'

const Navbar = () => {
  return (
    <div>
     <nav className='flex justify-between bg-slate-700 text-white p-2'>
        <div className="logo">
            <span>iTask</span>
        </div>
    <ul className='flex gap-8 mx-8'>
        <li className="cursor-pointer hover:font-bold transition-all ">Home</li>
        <li className="cursor-pointer hover:font-bold transition-all">Your Tasks</li>
    </ul>
     </nav>
    </div>
  )
}

export default Navbar