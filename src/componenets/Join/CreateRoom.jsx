import React, { useState } from 'react'

function CreateRoom() {
  const [ Ready , setReady  ] = useState({'createRoom':true , 'connectToRoom':true})

  return (
    <div className='text-white h-screen flex items-center justify-center'>
      <div className='flex flex-col items-center gap-4 '>
        {<button className='w-[150px] h-[40px] hover: text-[16px] rounded-md  tracking-wide py-2 px-6 bg-[#0F2A25] border border-blue-500'>Create Room</button>}
        {<button className='w-[150px] h-[40px]  text-[16px] rounded-md  tracking-wide py-2 px-6 bg-[#0F2A25] border border-blue-500'>Join Room</button>}
      </div>
    </div>
  )
}

export default CreateRoom