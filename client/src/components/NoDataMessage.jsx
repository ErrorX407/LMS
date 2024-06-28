import React from 'react'

const NoDataMessage = ({ message }) => {
  return (
    <div className='w-full md:w-screen h-[50vh] flex justify-center items-center'>
        <p className='w-fit px-3 py-3 md:px-4 md:py-3 rounded-2xl bg-white/10 text-sm md:text-xl cursor-default text-center'>{message}</p>
    </div>
  )
}

export default NoDataMessage;