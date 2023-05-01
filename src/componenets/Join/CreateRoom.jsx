import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function CreateRoom() {
  const [ Ready , setReady  ] = useState({'createRoom':true , 'connectToRoom':true})

  return (
    <div className='text-white h-screen flex items-center justify-center'>
      <div className='flex flex-col items-center gap-4 '>
        <Link to="/Create" ><button className='w-[150px] h-[40px] hover: text-[16px] rounded-md  tracking-wide py-2 px-6 bg-[#0F2A25] border border-blue-500'>Create Room</button></Link>
        <Link to="/Connect"><button className='w-[150px] h-[40px]  text-[16px] rounded-md  tracking-wide py-2 px-6 bg-[#0F2A25] border border-blue-500'>Join Room</button></Link>
      </div>
    </div>
  )
}

export default CreateRoom