import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white'>
            <div className='flex justify-between items-center p-5 lg:mx-[230px]'>
                <div className="logo font-bold">
                    <span className='text-green-700'>&lt; </span>
                    Pass
                    <span className='text-green-700'> OP&gt; </span>
                </div>
                <div className="text-white flex items-center justify-center">
                    <button className='flex gap-4 bg-green-600 w-fit p-2 rounded-full'>
                        <img src="/github.png" alt="" className='invert w-5' />
                        <span className='font-bold'>Github</span>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
