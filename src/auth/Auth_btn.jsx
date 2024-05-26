import React from 'react'


function Auth_btn({text = 'example',type = 'button', className='',children, ...props}) {
  return (
    <button className={` ${className} w-[30%] text-white text-center px-2 py-4 rounded-xl flex items-center justify-around ok relative cursor-pointer active:scale-75 dark:text-white border hover:border-none`} type={type} {...props}>{children} {text} </button>
  )
}

export default Auth_btn