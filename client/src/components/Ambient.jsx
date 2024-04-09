import React from 'react'

const Ambient = () => {
  return (
    <>
    <div className='fixed top-0 right-0 w-1/4 h-1/4 bg-purple blur-[200px] pointer-events-none z-[-1]'></div>
    <div className='fixed top-0 left-0 w-[30%] h-[30%] bg-purple blur-[200px] pointer-events-none z-[-1]'></div>
    <div className='fixed bottom-0 right-0 w-[30%] h-[30%] bg-purple blur-[200px] pointer-events-none z-[-1]'></div>
    <div className='fixed bottom-0 left-0 w-1/4 h-1/4 bg-purple blur-[200px] pointer-events-none z-[-1]'></div>
    </>
  )
}

export default Ambient