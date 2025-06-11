import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800 flex text-white items-center justify-between h-[115px] md:text-xl'>
            <div className="logo font-bold text-2xl flex justify-start items-center mx-3">
                <span className='text-green-700'>&lt; </span>
                Pass
                <span className='text-green-700'> OP&gt; </span>
            </div>
            <span className='mx-2'>Save Your Password@Trademark 2024</span>
        </div>
    )
}

export default Footer
