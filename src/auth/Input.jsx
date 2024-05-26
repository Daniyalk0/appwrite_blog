import React, { useId } from 'react';

const Input = React.forwardRef(({label, type, className, errors, ...props}, ref) => {
    const id = useId()
  return (
    <div className='w-[100%]  flex flex-col mobile:w-[90%]'>
      <label htmlFor={id} className='ml-1 dark:text-zinc-400'>{label}</label>
      <input type={type} ref={ref} {...props} id={id} className={`w-full  rounded-lg outline-none border border-zinc-400 pl-3 focus:border-purple-500 transition-all duration-200 focus:shadow-md focus:shadow-purple-400 ${className} dark:bg-zinc-700 dark:border-none dark:text-white`}/>
      
    </div>
    
  );
});

export default Input;
