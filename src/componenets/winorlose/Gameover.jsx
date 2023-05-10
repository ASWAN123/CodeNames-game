import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { roomContext } from '../contextAPI';
import { FaPlay } from 'react-icons/fa';

function Gameover() {
    const location = useLocation();
    let parseStuff = location.pathname.replace("/gameover/", "").split("-");
    let roomID = parseStuff.shift() ;
    let playerID = parseStuff.join("-") ;
    
    let {data , setData ,  db } = useContext(roomContext) ;
    let room = data.find((doc) => doc.id == roomID) ;
    let player = data.find((doc)=> doc.id == roomID )?.players?.find((player)=> player.id == playerID)

    let navigate  = useNavigate()

    const  redirectToHome = () => {
        navigate('/')
    }



    return (
        <div className='min-h-screen flex   '>
            <div className='w-[30%] mx-auto border  pt-12  items-center'>
                <div className='flex gap-4 items-center justify-center '>
                    <p className='text-[25px] '>Blue Team</p>
                    <p className='text-[20px]'>vs</p>
                    <p className='text-[25px] '>Red Team</p>
                </div>
                <p className='text-[35px] text-center'>{room?.winner} <span className='text-orange-400'>Win !!</span></p>
                <div className='p-6 flex gap-6 flex-col  '>
                    <p className='px-4 py-2 bg-blue-500  rounded-lg text-center font-bold  '>{room?.cards.filter((card)=> card.flip == true && card.team == 'Team 1').length} cards flipped</p>
                    <p className='px-4 py-2 bg-red-500  rounded-lg  text-center font-bold '>{room?.cards.filter((card)=> card.flip == true && card.team == 'Team 2').length} cards flipped</p>
                    <div onClick={redirectToHome} className='px-4 py-2 bg-green-500  rounded-lg  text-center font-bold flex flex-col items-center gap-2  cursor-pointer'>
                        <p>Play again</p> 
                        <FaPlay />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Gameover