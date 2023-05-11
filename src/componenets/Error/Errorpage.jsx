import React from 'react'
import { useNavigate } from 'react-router-dom'

function Errorpage() {
    let  navigate  = useNavigate()
    const  redirectTohome  = () => {
        navigate('')
    }
  return (
    <div className='w-full min-h-screen border flex items-center justify-center flex-col gap-6'><p className='text-3xl'>Error page</p>
    <button className='bg-gray-400 px-6 text-[20px] text-black' onClick={redirectTohome}>Go back to Home</button></div>
  )
}

export default Errorpage