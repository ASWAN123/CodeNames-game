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

  let room = data.find((doc) => doc.id == roomID) ;
  let player = data.find((doc)=> doc.id == roomID )?.players?.find((player)=> player.id == playerID)


  let [countor, setCountor] = useState(0);


  // settimeout ()

  const countDown =  () => {
    let intervalID = setTimeout(() => {
      let dostuff =  db.collection("Rooms").doc(roomID).update({turn: room?.turn == "Team 1" ? "Team 2" : "Team 1",guessing: false,countDown: false,})
      console.log("turn  ended for " ,  room?.turn);
      if(countor == 0){
        clearTimeout(intervalID)
      }
      
    }, 20000 ) ;
  };




  useEffect(() => {
    if (data.find((doc)=> doc.id  == roomID)?.countDown == true ) {
      countDown() ;
      setCountor(data.find((doc)=> doc.id  == roomID)?.timer) ;
      console.log("turn start " ,  room?.turn);
    }
  }, [data]);
  



  return (
    <div className='h-screen flex  justify-between pt-12 gap-2 '>
      <TeamCard key="Team1" roomID={roomID} teamName="Team 1" setCountor ={setCountor} countor={countor}/>
      <Cards key="cards" roomID={roomID} player={player} />
      <TeamCard key="Team2"  roomID={roomID} teamName="Team 2" setCountor ={setCountor} countor={countor} />
    </div>
  )
}

export default Game