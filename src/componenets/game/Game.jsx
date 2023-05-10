import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";

import { roomContext } from '../contextAPI';
import TeamCard from './TeamCard';
import Cards from './Cards';

function Game() {
  let {data , setData ,  db } = useContext(roomContext) ;
  const location = useLocation() ;
  let navigate = useNavigate()
  let parseStuff = location.pathname.replace('/game/','').split('-') ;
  let roomID = parseStuff.shift()
  let playerID = parseStuff.join("-") ;

  let room = data?.find((doc) => doc.id == roomID) ;
  let player = data?.find((doc)=> doc.id == roomID )?.players?.find((player)=> player.id == playerID)

  useEffect(()=> {
    if( room?.gameover == true ){
      db.collection('Rooms').doc(roomID).update(({ started:false , guessing:false   }))
      navigate('/gameover/'+roomID+'-'+player.id)
    }
  } , [room])



  useEffect(()=> {
    if( room?.flip == 0 && room?.guessing == true){
        console.log('turn end')
        let updatedcards = room.cards.map((x) => {
            return {...x ,  hover:[]} ;
        });
        db.collection('Rooms').doc(roomID).update({started:true , turn: room?.turn == 'Team 1' ? 'Team 2' : 'Team 1' , guessing:false ,  cards:updatedcards})
    }

} , [room])


  const  handleEndTurn  = () => {
    db.collection('Rooms').doc(roomID).update(({ guessing :  false , 'turn' : room?.turn == 'Team 1' ? 'Team 2' :  'Team 1' }))
    return
  }



  return (
    <div className={`min-h-screen max-w-screen flex md:flex-col lg:flex-row relative  gap-2 ${room?.turn == 'Team 2' ?' bg-gradient-to-br  from-red-900 to-red-700' : 'bg-gradient-to-br  from-blue-900 to-blue-700' }`}>
      <div className='flex  lg:flex-col gap-2 pl-2 justify-center lg:justify-normal p-1   '>
        
        <div className="  text-center  p-1 absolute bottom-2 left-4 flex flex-col gap-3 ">
        <p className='bg-green-300 text-black w-[100px] rounded-lg'>
            Players : {room?.players.length}
          </p>
          <span>Welcome : {player?.name } </span>

        </div>

        { room?.turn == player?.team && room?.guessing == true && <button className='absolute font-bold text-black top-4 w-[230px] py-1  bg-orange-200 text-[18px] rounded-lg  ' onClick={handleEndTurn} >End turn</button>}
      
        <TeamCard key="Team1"   teamName="Team 1" />
        <TeamCard key="Team2"   teamName="Team 2" />
      </div>
      <Cards key="cards"  />
      
    </div>
  )
}

export default Game