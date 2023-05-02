import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import { HiUserGroup } from 'react-icons/hi';
import { roomContext } from '../contextAPI';

function Game() {
  let { db } = useContext(roomContext) ;
  const location = useLocation();
  let roomID = location.state.roomID;

  let [data , setData] = useState({})

  useEffect(() => {
    const unsubscribe = db.collection('Rooms').onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => {
        if(doc.id == roomID){
          // console.log({ id:doc.id , ...doc.data()})
          setData({ id:doc.id , ...doc.data()})
        }
      });

    });

    return () => {
      unsubscribe();
    };
  }, []);
  


  return (
    <div className='h-screen flex  justify-between  '>
      <div className=' flex flex-col gap-4 p-1' >
        <div className='bg-green-300 text-black w-[100px] rounded-lg m-2 text-center  p-1  '>
          <p>Online : {data?.players?.length} </p>
        </div>
        <div className=' p-2 card w-[270px] h-[170px] flex flex-col gap-4  rounded-lg mt-6  bg-gradient-to-r from-[#ec4899] to-[#db2777]  '>
        <HiUserGroup  size={40} color="white" className='mx-auto' />
        <div className='flex flex-col px-4 gap-1'>
            <p className='border-b-2 '>Operatives</p>
            <div className='flex gap-2 '>
              {
                data?.players?.map((player)=> {
                  if(player.team === "Team 1" && player.spymaster === false){
                    return <span key={player.id} className='bg-gray-200 text-blue-500 rounded-lg px-1  '>{player.name}</span>
                  }
                })
              }

            </div>
            <p className='border-b-2'>Spymaster</p>
            <div className='flex gap-2 '>
            {
                data?.players?.map((player)=> {
                  if(player.team === "Team 1" && player.spymaster === true){
                    return <span key={player.id} className='bg-gray-200 text-blue-500 rounded-lg px-1  '>{player.name}</span>
                  }
                })
              }
            </div>  
        </div>

        </div>
      </div>
      
      <div className='  w-full'>b</div>
      <div className='  flex flex-col gap-4 p-1'>
        <div className='bg-green-300 text-black w-[150px] rounded-lg m-2 text-center  p-1 ml-auto '>
            <p>Reset the game</p>
          </div>
        <div className='p-2 card w-[270px] h-[170px] flex flex-col gap-4  rounded-lg mt-6 ml-auto bg-gradient-to-r from-[#4f46e5]  to-[#6366f1]  ' >
          <HiUserGroup  size={45} color="white" className='mx-auto' />
          <div className='flex flex-col px-4 gap-1'>
            <p className='border-b-2'>Operatives</p>
            <div className='flex gap-2 '>
            {
                data?.players?.map((player)=> {
                  if(player.team === "Team 2" && player.spymaster === false){
                    return <span key={player.id} className='bg-gray-200 text-blue-500 rounded-lg px-1  '>{player.name}</span>
                  }
                })
              }

            </div>
            <p className='border-b-2'>Spymaster</p>
            <div className='flex gap-2 '>
            {
                data?.players?.map((player)=> {
                  if(player.team === "Team 2" && player.spymaster === true){
                    return <span key={player.id} className='bg-gray-200 text-blue-500 rounded-lg px-1  '>{player.name}</span>
                  }
                })
              }
              
            </div>  
        </div>
          
        </div>
      </div>

    </div>
  )
}

export default Game