import React, { useState , useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi';
import { roomContext } from "../contextAPI";
import uuid from "react-uuid";
import { useNavigate} from "react-router-dom";

import firebase from 'firebase/compat/app';//firebase

function Connect() {

    let {data ,  setData , db} = useContext(roomContext) ;
    let [teamStati , setTeamStati] = useState({'team1':0 , 'team2':0})
    let [spymasterExists , setSpymasterExists] = useState(false)
    let [ player , setPlayer ] = useState({
        'id':uuid() ,
        'name':'',
        'team':'',
        'spymaster':false,
        'admin':false
      })


    let [ validatTOKEN  , setValidatTOKEN] = useState(true)
    let [message ,  setMessage] = useState() // Not Valid
    let [ RoomID  , setRoomID] = useState('') ;

    const navigate = useNavigate() ;


    useEffect(()=> {
        let room = data.find((x)=> x.id == RoomID)
        if (room){
        if(room?.players?.filter((x)=> x.spymaster === true && x.team == player.team ).length == 1 || room?.players?.filter((x)=> x.spymaster === true ).length == 2){
            setSpymasterExists(true)
        }else{
            setSpymasterExists(false)
        }
        }

    } , [player])



    const checkValidationRoomID =(e) => {
        setRoomID(e.target.value)

        let room = data.find((x)=> x.id == e.target.value)
        if(room){
            setMessage("Valid")
            setTeamStati({team1:room?.players?.filter((x)=> x.team === 'Team 1' ).length , team2:room?.players?.filter((x)=> x.team === 'Team 2' ).length} )
            if(room.players.filter((x)=> x.spymaster === true && x.team == player.team ).length == 1){
                setSpymasterExists(true)
            }
        }else{
            setSpymasterExists(false)
        }
    }


    const RedirectToRoom =(x) => {
        let checkerifexsit  = data?.find((doc)=> doc.id == RoomID).players.find((x)=> x.name == player.name )
        console.log(checkerifexsit)

        if(checkerifexsit){
            return navigate(`/game/${x+"-"+checkerifexsit.id}`);

        }else{
            let room = data.find((x)=> x.id == RoomID)
            if (room){
              if(room?.players?.length === 0  || room?.players?.map((x)=> x.team == player.team ).length < 8){
                db.collection('Rooms').doc(RoomID).update({players:firebase.firestore.FieldValue.arrayUnion(player)}) ;
              }else{
                console.log('limit has been exucted')
              }
            }
            navigate(`/game/${x+"-"+player.id}`);
        }

      }





    return (
        <div className='text-white h-screen flex items-center justify-center'>
            <div className='w-full h-[80%]  bg-[] flex items-center  justify-center gap-12 '>
                <div className='w-[350px] flex flex-col items-center gap-10 p-6  rounded-md   relative'>
                    <div className='flex gap-3 items-center w-full '><Link rel="stylesheet" to="/" ><BiArrowBack size={25} className='bg-blue-400 rounded-[50%] p-1 cursor-pointer ' /></Link> <p className='text-[20px] '>Connect to an existing room</p></div>
                    <div className=' flex flex-col gap-6 items-center'>
                        {/* <label htmlFor="">Add room ID : </label> */}
                        <input value={RoomID} onChange={(e)=> {checkValidationRoomID(e)}} placeholder='Add you room ID' id='' className=' bg-transparent min-w-[70%] mt-2 text-gray-400 border-b-2 px-6 border-b-[#22d3ee] outline-none ' />
                        
                        { validatTOKEN && <span className={`${message == 'Valid' ? 'text-green-200 ' : 'text-red-300'} mr-auto text-[12px] mt-[-18px] `}> {message} </span> }

                        <input value={player.name} onChange={(e)=> {setPlayer({...player , name:e.target.value})}} placeholder='Add your Username' id='' className=' bg-transparent min-w-[70%]  text-gray-400 border-b-2 px-6 border-b-[#22d3ee] outline-none ' />

                        <div className='flex gap-4 '>
                            
                            <input disabled={ ( teamStati.team1 == 8 || message !=='Valid' ) ? true : false} checked ={ player.team == "Team 1" ? true : false} onChange={()=> {setPlayer({...player , team:'Team 1'})}} type="checkbox" name="" id="" />
                            <span>Team 1 {`(${teamStati.team1})`}</span>
                            <input disabled={ ( teamStati.team2 == 8 || message !=='Valid' ) ? true : false}  checked ={player.team == "Team 2" ? true : false} onChange={()=> {setPlayer({...player , team:'Team 2'})}} type="checkbox" name="" id="" />
                            <span>Team 2 {`(${teamStati.team2})`}</span>
                        </div>
                        { !spymasterExists &&
                            <div className='flex gap-4 '>
                                <input disabled={ (  message !=='Valid' ) ? true : false}  checked ={player.spymaster} onChange={()=> {setPlayer({...player , spymaster:!player.spymaster})}} type="checkbox" name="" id="" />
                                <span>Spymaster</span>
                            </div>
                        }

                        
                        <button  onClick={()=> {RedirectToRoom(RoomID)}} className='w-[150px] h-[40px]  text-[16px] rounded-md  tracking-wide py-2 px-6 bg-orange-500 border '>Join   Room</button>
                    
                    </div>
                </div>
            </div>
        </div>
    )
} 

export default Connect