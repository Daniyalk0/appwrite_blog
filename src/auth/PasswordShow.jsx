import React from 'react'

function PasswordShow({className, content, ...props}) {
  return (
    <div className='absolute bottom-[10px] right-[17px] cursor-pointer' {...props}>{content}</div>
  )
}

export default PasswordShow