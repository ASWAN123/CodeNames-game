import React, { useContext, useEffect, useState } from 'react'
import { roomContext } from '../contextAPI'
import firebase from 'firebase/compat/app';//firebase

function Cards({roomID ,  player}) {
    let {data , setData , db} = useContext(roomContext)
    let [gues , setGues] = useState('')

    let [started , setStarted] = useState(true)



    const  startTheGame = async () => {
        let started = await db.collection('Rooms').doc(roomID).update({'started':true})
        let turn = await db.collection('Rooms').doc(roomID).update({'turn':player.team})
    }

    const giveClue = () => {
        return
    }


    return (
        <div className='  w-full flex flex-col items-center '>


        {  !data?.find((doc)=> doc.id == roomID)?.started  && player?.admin && <button onClick={startTheGame} className='text-center  text-[18px]  bg-green-600  rounded-lg px-2 py-1 absolute top-3  '>Start Game</button> }
        
        <div className='grid grid-cols-5 gap-2 p-4 pt-7 '>
        
        {
            data?.find((doc)=> doc.id == roomID)?.cards?.map((card)=> {
            
            return <div key={card.word} className={ `  hover:shadow-lg  cursor-pointer hover:scale-[95%] flex flex-col items-center justify-center rounded-lg h-[90px] w-[130px] border-4  ${ player?.spymaster == false ? 'bg-gray-400 border-4  border-b-blue-200 border-t-red-200' : card.color} `}>
                
                
                <p className='bg-white text-black py-1 px-2 rounded-lg font-bold  shadow-lg '> {card.word} </p>
                
                
                </div>
            })
        }

        </div>

        { player?.spymaster == true && data?.find((doc)=> doc.id == roomID)?.turn == player.team  && <div className='  w-[60%] rounded-lg  text-center  p-1 mx-auto  '>
            <div className='flex items-center justify-between gap-2 mx-auto'>
                <input value={gues} onChange={(e)=> {setGues(e.target.value)}} type="text" name="" id="" className='w-[70%] outline-none h-8 bg-white rounded-lg text-black p-2 '/>
                <p className='px-3 py-1 bg-white text-black rounded-lg'>4</p>
                <button onClick={giveClue} className='bg-green-600 px-3 py-1 rounded-lg '>Give Clue</button>
            </div>
        </div>}
    </div>
    )
}

export default Cards