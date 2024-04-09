import React from 'react'

const NoDataMessage = ({ message }) => {
  return (
    <div className='w-full h-[50vh] flex justify-center items-center'>
        <p className='w-fit px-4 py-3 rounded-2xl bg-white/10 text-xl cursor-default text-center'>{message}</p>
    </div>
  )
}

export default NoDataMessage