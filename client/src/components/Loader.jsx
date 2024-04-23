import React from 'react'
import { CircleNotch } from '@phosphor-icons/react'

const Loader = ({size, color}) => {
  return (
    <div className='px-2 py-2 origin-center w-screen m-auto'>
        <CircleNotch size={42} weight="bold" className={`animate-spin fi fi-br-spinner flex justify-center items-center text-white`}></CircleNotch>
    </div>
  )
}

export default Loader