import React, { useContext, useState } from 'react'
import { HiUserGroup } from 'react-icons/hi';
import { roomContext } from '../contextAPI';



function TeamCard({ roomID , teamName }) {
  let {data , setData ,  db } = useContext(roomContext) ;
  let Team = data.find((doc)=> doc.id == roomID)




  return (
    <div className=' flex flex-col gap-4 p-1 ' >
    {teamName=="Team 1" && <div className='bg-green-300 text-black w-[100px] rounded-lg  text-center  p-1 absolute top-2 left-2 '>
      <p>Online : {data.find((doc)=> doc.id == roomID)?.players?.length} </p>
    </div>}
    <div className={` p-2 card w-[270px]  flex flex-col gap-4  rounded-lg mt-6  bg-gradient-to-r ${ teamName == "Team 2"  ? 'from-[#6366f1] to-[#818cf8]' : 'from-[#ec4899] to-[#db2777]'}  `}>
    <div className='flex gap-2 text-[25px] items-center px-6 justify-center '>
      {/* <HiUserGroup  size={35} color="white" className='mx-auto' /> */}
      <p>8 Words left</p>
    </div>
    <div className='flex flex-col px-4 gap-1'>
        <p className='border-b-2 '>Operatives</p>
        <div className='flex gap-2 '>
          {
            Team?.players.filter((player)=> player.team == teamName).map((player)=> {
              if(player.spymaster === false){
                return <span key={player.id} className={`bg-white ${ teamName == "Team 2"  ? ' text-[#818cf8]' : ' text-[#db2777]'}   rounded-lg px-1  `} >{player.name}</span>
              }
            })
          }

        </div>
        <p className='border-b-2'>Spymaster</p>
        <div className='flex gap-2 '>
        {
            Team?.players.filter((player)=> player.team == teamName).map((player)=> {
              if( player.spymaster === true){
                return <span key={player.id} className={`bg-white   ${ teamName == "Team 2"  ? ' text-[#818cf8]' : ' text-[#db2777]'} rounded-lg px-1  `}>{player.admin ? "admin:": ""}{player.name}</span>
              }
            })
          }
        </div>  
    </div>

    </div>





  </div>
  )
}

export default TeamCard ;