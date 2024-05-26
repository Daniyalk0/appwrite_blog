import React from 'react'

function PasswordShow({className, content, ...props}) {
  return (
    <div className='absolute bottom-[12px] right-[20px] cursor-pointer' {...props}>{content}</div>
  )
}

export default PasswordShow