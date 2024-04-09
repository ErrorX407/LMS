import React from 'react'
import Ambient from '../components/Ambient'
import { Link } from 'react-router-dom'
import PageNotFoundImage from "../imgs/404 (2).png"

const PageNotFound = () => {
  return (
    <div>
        <Ambient />
        <div className='px-20 flex flex-col justify-center items-center h-[65vh] gap-5'>
            <div className='w-[20%]'>
            <img src={PageNotFoundImage} alt="" className='w-full' />
            </div>
        <h1 className='text-[6vw] font-candela'>Page Not Found !!!</h1>
        <Link to="/" className='text-[2vw] text-black font-semibold bg-purple px-[4vw] py-[1.5vw] rounded-3xl mouseenter font-messinaReg '>Go to home</Link>
        </div>
    </div>
  )
}

export default PageNotFound