import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";

import { roomContext } from '../contextAPI';
import TeamCard from './TeamCard';

function Game() {
  let { db } = useContext(roomContext) ;
  const location = useLocation() ;

  let parseStuff = location.pathname.replace('/game/','').split('-') ;
  let roomID = parseStuff.shift()
  let playerID = parseStuff.join("-") ;



  

  let [data , setData] = useState({})

  useEffect(() => {
    const unsubscribe = db.collection('Rooms').onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => {
        if(doc.id == roomID){
          setData({ id:doc.id , ...doc.data()})
        }
      });

    });

    return () => {
      unsubscribe();
    };
  }, []);


  let Team1 = [] ;
  let Team2 = [] ;
  data?.players?.map((player)=> {
    if(player.team === "Team 1"){
      Team1.push(player)
    }else{
      Team2.push(player)
    }
  }) ;

  
  let player = data?.players?.find((player)=> player.id == playerID)
  console.log(player)


  return (
    <div className='h-screen flex  justify-between pt-12 '>
      <TeamCard key="Team1" data = {data} Team = {Team1} teamName="Team1"/>
      <div className='  w-full'>
        <div className='grid grid-cols-5 gap-2 p-4 pt-7 '>
          
          {
            data?.cards?.map((card)=> {
              // console.log(card.color)
               return <div key={card.word} className={ `  hover:shadow-lg  cursor-pointer hover:scale-[95%] flex flex-col items-center justify-center rounded-lg h-[80px] w-[130px] border-4  ${ player.spymaster == false ? 'bg-gray-400 border-4  border-b-blue-200 border-t-red-200' : card.color} `}>
                 
                 
                 <p className='bg-white text-black py-1 px-2 rounded-lg font-bold  shadow-lg '> {card.word} </p>
                 
                 
                 </div>
            })
          }

        </div>
      </div>
      <TeamCard key="Team2" data = {data} Team = {Team2} teamName="Team2"/>

    </div>
  )
}

export default Game