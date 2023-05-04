import React from 'react'
import { HiUserGroup } from 'react-icons/hi';

function TeamCard({data , Team , teamName }) {

  return (
    <div className=' flex flex-col gap-4 p-1 ' >
    {/* <div className='bg-green-300 text-black w-[100px] rounded-lg m-2 text-center  p-1  '>
      <p>Online : {data?.players?.length} </p>
    </div> */}
    <div className={` p-2 card w-[270px] h-[170px] flex flex-col gap-4  rounded-lg mt-6  bg-gradient-to-r ${ teamName == "Team2"  ? 'from-[#6366f1] to-[#818cf8]' : 'from-[#ec4899] to-[#db2777]'}  `}>
    <HiUserGroup  size={40} color="white" className='mx-auto' />
    <div className='flex flex-col px-4 gap-1'>
        <p className='border-b-2 '>Operatives</p>
        <div className='flex gap-2 '>
          {
            Team?.map((player)=> {
              if(player.spymaster === false){
                return <span key={player.id} className={`bg-white ${ teamName == "Team2"  ? ' text-[#818cf8]' : ' text-[#db2777]'}   rounded-lg px-1  `} >{player.name}</span>
              }
            })
          }

        </div>
        <p className='border-b-2'>Spymaster</p>
        <div className='flex gap-2 '>
        {
            Team?.map((player)=> {
              if( player.spymaster === true){
                return <span key={player.id} className={`bg-white ${ teamName == "Team2"  ? ' text-[#818cf8]' : ' text-[#db2777]'} rounded-lg px-1  `}>{player.name}</span>
              }
            })
          }
        </div>  
    </div>

    </div>
  </div>
  )
}

export default TeamCard