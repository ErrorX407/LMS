import React from 'react'
import { CircleNotch } from '@phosphor-icons/react'

const LoaderTwo = ({size, color}) => {
  return (
    <div className=' px-2 py-2 origin-center'>
        <CircleNotch size={size} weight="bold" className={`animate-spin fi fi-br-spinner flex justify-center items-center` + color}></CircleNotch>
    </div>
  )
}

export default LoaderTwo