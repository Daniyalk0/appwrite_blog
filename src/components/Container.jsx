import React from 'react'

function Container({children, className}) {
  return (
    <div className={`max-w-[1400px]  m-auto tablet:min-h-[70vh]  ${className} relative `}>
        {children}
    </div> 
  )
}

export default Container