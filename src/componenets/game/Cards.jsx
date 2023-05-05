import React, { useContext, useEffect, useState } from 'react'
import { roomContext } from '../contextAPI'
import firebase from 'firebase/compat/app';//firebase
import { GiClick } from 'react-icons/gi';


function Cards({roomID ,  player  , setCountor }) {

    let {data , setData , db} = useContext(roomContext) ;
    let [guess , setGuess] = useState('') ;
    let [flipCount , setFlipCount] = useState(0) ;

    let room = data.find((doc) => doc.id == roomID) ;


    // this only run one  time when  starting  the  game
    const  startTheGame =  () => {
        // you can set up who  can  play  first  on lobby later
        let started = db.collection('Rooms').doc(roomID).update({'started':true , 'turn': 'Team 1' , 'guessing' : false  , 'guessValuee': ''})
    }

    
    const giveClue =  () => {
        let givemyClue =  db.collection('Rooms').doc(roomID).update({  'timer' : 20, 'guessing' : true , 'guessValuee': guess , 'countDown':true , history:firebase.firestore.FieldValue.arrayUnion(guess)})
        setGuess('')
    }


    const flipTtheCard = (word) => {
        // update
        if(room?.turn == player.team && room?.guessing == true ){
            let flipit = db.collection('Rooms').doc(roomID).update({'cards':room?.cards.map((card)=> { // update  the array  of  the  cards 
                if(card.index == word.index){
                    return {...word ,  flip:true , 'by':player.team}
                }

                return card
            } )})

            setFlipCount(flipCount+1)
            if(word.team == player.team && player.team == word.by  && room.turn == player.team ){  // last one  just  for  verification 
                db.collection('Rooms').doc(roomID).update({'points': 8 - db.collection('Rooms').doc(roomID).cards.filter((y)=> y.flip == true && y.team == player.team  && y?.by == player.team ).length })
            }else{
                console.log('continue')
            }

            
        }
    } 



    useEffect(()=> {

        if(flipCount == 2){
            // setCountor(0)
            let dostuff =  db.collection("Rooms").doc(roomID).update({turn: room?.turn == "Team 1" ? "Team 2" : "Team 1",guessing: false,countDown: false,})
            console.log('turn ended')
        }

    } , [flipCount])


    return (
        <div className='  w-full flex flex-col items-center '>


        { !room?.started  && player?.admin && <button onClick={startTheGame} className='text-center  text-[18px]  bg-green-600  rounded-lg px-2 py-1 absolute top-3  '>Start Game</button> }

        { room?.started == true && room?.guessing == false && player?.spymaster == true && room?.turn == player.team  && <div className='px-2 py-1 absolute top-2 rounded-lg   text-black font-bold text-[18px]  bg-white '>Give your operatives a Clue</div> }

        { player?.admin == false && room?.started && room?.guessing && room?.turn == player.team && <div className='px-2 py-1 absolute top-2 rounded-lg   text-black font-bold text-[18px]  bg-white '>{room?.guessValuee}</div> }

        { player?.admin == true && room?.started && room?.guessing && room?.turn == player.team && <div className='px-2 py-1 absolute top-2 rounded-lg   text-black font-bold text-[18px]  bg-white '>You operatives are guessing now ...</div> }
        
        <div className='grid grid-cols-5 gap-2 p-4 pt-7 '>
        
        {
            room?.cards?.map((card)=> {
            
            return <div onClick={()=>{flipTtheCard(card)}} key={card.word} className={ ` relative hover:shadow-lg  cursor-pointer hover:scale-[95%] flex flex-col items-center justify-center rounded-lg h-[90px] w-[130px] border-4  ${ ( player?.spymaster == false && card.flip == false  )? 'bg-gray-400 border-4  border-b-blue-200 border-t-red-200' : card.color} `}>
                
                { player?.spymaster == false && player.team == room?.turn && card.flip == false && < GiClick size={30} className="absolute border-white top-[-10px] right-[-10px] " color='yellow'/> }
                <p className='bg-white text-black py-1 px-2 rounded-lg font-bold  shadow-lg '> {card.word} </p>
                
                
                </div>
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


        { player?.admin == true && room?.started && room?.guessing && room?.turn == player.team && <div className='px-2 py-1 absolute bottom-4 rounded-lg   text-black font-bold text-[18px] border-4   border-sky-200   bg-white  '>{room?.guessValuee}</div> }
    </div>
    )
}

export default Cards