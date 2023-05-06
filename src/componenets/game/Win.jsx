import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { roomContext } from '../contextAPI';

function Win({roomID}) {
  let {data , setData , db} = useContext(roomContext) ;
  let room = data.find((doc) => doc.id == roomID) ;


  return (
    <div className={` w-[400px] h-[300px]  absolute rounded-lg opacity-90 top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] ${ room?.win == 'Team 1' ? 'bg-gradient-to-b from-blue-400 to-blue-200': 'bg-gradient-to-r from-[#6366f1] to-[#818cf8]' } ` } >
      <p className=' mx-auto  text-[25px] font-bold text-center mt-5 leading-3'>Team 1 Win !!</p>


    </div>
  )
}

export default Win