import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";

import { roomContext } from '../contextAPI';
import TeamCard from './TeamCard';
import Cards from './Cards';

function Game() {
  let {data , setData ,  db } = useContext(roomContext) ;
  const location = useLocation() ;

  let parseStuff = location.pathname.replace('/game/','').split('-') ;
  let roomID = parseStuff.shift()
  let playerID = parseStuff.join("-") ;

  
  let player = data.find((doc)=> doc.id == roomID )?.players?.find((player)=> player.id == playerID)

  



  return (
    <div className='h-screen flex  justify-between pt-12 gap-2 '>
      <TeamCard key="Team1" roomID={roomID} teamName="Team 1"/>
      <Cards roomID={roomID} player={player} />
      <TeamCard key="Team2"  roomID={roomID} teamName="Team 2"/>
    </div>
  )
}

export default Game