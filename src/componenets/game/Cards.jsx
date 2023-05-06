import React, { useContext, useEffect, useState } from 'react'
import { roomContext } from '../contextAPI'
import firebase from 'firebase/compat/app';//firebase

import Win from './Win';
import Lost from './Lost' ;
import Card from './Card';

function Cards({roomID ,  player  }) {

    let {data , setData , db} = useContext(roomContext) ;
    let [guess , setGuess] = useState('') ;


    let room = data.find((doc) => doc.id == roomID) ;


    // this only run one  time when  starting  the  game
    const  startTheGame =  () => {
        let started = db.collection('Rooms').doc(roomID).update({ 'fliped': 0 , 'started':true , 'turn': 'Team 1' , 'guessing' : false  , 'guessValuee': '' , 'gameover':false})
    }

    
    const giveClue =  () => {
        db.collection('Rooms').doc(roomID).update({ 'fliped': 0 ,'timer' : 20, 'guessing' : true , 'guessValuee': guess , 'countDown':true , history:firebase.firestore.FieldValue.arrayUnion(guess) } )
        setGuess('')


        let intervalID = setTimeout(() => {
            // you need  a  condition here 
            if(room?.guessing == true ){
                db.collection('Rooms').doc(roomID).update({ turn: room?.turn == "Team 1" ? "Team 2" : "Team 1",guessing: false,countDown: false })
            }
            
          }, 25000 ) ;
    }


    useEffect(()=> {

        // restart  the  turn if  flip is  2 
        if(room?.fliped == 2){
            db.collection('Rooms').doc(roomID).update({ fliped:0  , turn: room?.turn == "Team 1" ? "Team 2" : "Team 1",guessing: false,countDown: false })
            console.log('turn chnaged')
        }

        if ( room?.gameover == true){
            console.log('gameover' )
            db.collection('Rooms').doc(roomID).update({cards : room?.cards.map((x) => {
                return {...x , flip:true}
            })})
            db.collection('Rooms').doc(roomID).update({ fliped:0  , turn: '' , guessing: false ,countDown : false })
        }

    }  , [room] )



    return (
        <div className='  w-full flex flex-col items-center '>
        {/* game  over */}
        { room?.gameover == true  &&  <div className='px-2 py-1 absolute top-2 rounded-lg   text-black font-bold text-[18px]  bg-white '>Game over</div> }

        {/* only admin has the  previlage  to  start the game */}
        { room?.gameover == false && !room?.started  && player?.admin && <button onClick={startTheGame} className='text-center  text-[18px]  bg-green-600  rounded-lg px-2 py-1 absolute top-3  '>Start Game</button> }

        {/* this only will show  up to  spymasters */}
        { room?.started == true && room?.guessing == false && player?.spymaster == true && room?.turn == player.team  && <div className='px-2 py-1 absolute top-2 rounded-lg   text-black font-bold text-[18px]  bg-white '>Give your operatives a Clue</div> }

        {/* same stuff  make  this  more  smaller  notification  for  spymaster  and  operatives  to  wait  for  others  while playing */}
        { room?.started == true && room?.guessing == true && player?.spymaster == true && room?.turn != player.team  && <div className='px-2 py-1 absolute top-2 rounded-lg   text-black font-bold text-[18px]  bg-white '>the opponent spymaster is playing , wait for your  turn ....</div> }

        { room?.started == true && room?.guessing == true && player?.spymaster == false && room?.turn != player.team  && <div className='px-2 py-1 absolute top-2 rounded-lg   text-black font-bold text-[18px]  bg-white '>the opponent operatives is playing , wait for your  turn...</div> }

        {/* same stuff  make  this  more  smaller  notification  for  spymaster  and  operatives  to  wait  for  others  while playing*/}

        { player?.spymaster == false && room?.started && room?.guessing && room?.turn == player.team && <div className='px-2 py-1 absolute top-2 rounded-lg   text-black font-bold text-[18px]  bg-white '>{room?.guessValuee}</div> }

        { player?.spymaster == true && room?.started && room?.guessing && room?.turn == player.team && <div className='px-2 py-1 absolute top-2 rounded-lg   text-black font-bold text-[18px]  bg-white '>You operatives are guessing now ...</div> }
        
        <div className='grid grid-cols-5 gap-2 p-4 pt-7 '>
        

        {
            room?.cards?.map((card)=> {
            return ( <Card key={card.index} card={card} roomID={roomID} player = {player} /> )
            })
        }


        </div>


        { room?.started == true && room?.guessing == false && player?.spymaster == true && room?.turn == player.team  && <div className='  w-[60%] rounded-lg  text-center  p-1 mx-auto  '>
            <div className='flex items-center justify-between gap-2 mx-auto'>
                <input value={guess} onChange={(e)=> {setGuess(e.target.value)}} type="text" name="" id="" className='w-[70%] outline-none h-8 bg-white rounded-lg text-black p-2 '/>
                <p className='px-3 py-1 bg-white text-black rounded-lg'>4</p>
                <button onClick={giveClue} className='bg-green-600 px-3 py-1 rounded-lg '>Give Clue</button>
            </div>
        </div>}

        {/* <Win  roomID={roomID} />  */}

        { player?.spymaster == true && room?.started && room?.guessing && room?.turn == player.team && <div className='px-2 py-1 absolute bottom-4 rounded-lg   text-black font-bold text-[18px] border-4   border-sky-200   bg-white  '>{room?.guessValuee}</div> }
    </div>
    )
}

export default Cards