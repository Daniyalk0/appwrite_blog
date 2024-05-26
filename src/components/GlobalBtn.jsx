import React from 'react'

function GlobalBtn({text='Get Started', type='button', className, ...props}) {
  return (
    <button className={`w-[15%] ${className} border-transparent border hover:border-zinc-100 
     text-center py-3 px-6 rounded-2xl hover:shadow-green-300 hover:shadow-lg transition-all duration-200 cursor-pointer text-white font-custom`} {...props} type={type}>{text}</button>
  )
}

export default GlobalBtn