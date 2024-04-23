import React from 'react'
import { CircleNotch } from '@phosphor-icons/react'

const Loader = ({size, color}) => {
  return (
    <div className='px-2 py-2 relative origin-center w-screen'>
      <div className=' fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
        <CircleNotch size={42} weight="bold" className={`animate-spin fi fi-br-spinner flex justify-center items-center text-white`}></CircleNotch>
      </div>
    </div>
  )
}

export default Loader