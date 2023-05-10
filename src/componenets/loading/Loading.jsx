import React from 'react'
import { Waveform } from '@uiball/loaders'

function Loading() {
  return (
        <div className='bg-[#082f49] fixed top-0 left-0 min-h-screen min-w-full flex items-center justify-center '>
            <Waveform 
                size={100}
                lineWeight={3.5}
                speed={1} 
                color="white" 
            />
        </div>
    
  )
}

export default Loading