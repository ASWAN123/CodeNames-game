
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import uuid from "react-uuid";
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate} from "react-router-dom";
import { roomContext } from "../contextAPI";
import { RandomReveal } from 'react-random-reveal'



//firebase 
import firebase from 'firebase/compat/app';
import mywords from "../../randomWords";


function Create() {
  let {data ,  setData , db} = useContext(roomContext) ;
  
  

  let [teamStati , setTeamStati] = useState({'team1':0 , 'team2':0})
  let [spymasterExists , setSpymasterExists] = useState(false)
  let [RoomID, setRoomID] = useState("b*9***86-****-48**-87*2-");
  let [Ready, setReady] = useState(false);
  let [copynotifs , setCopyNotifs] = useState('Click to copy')
  const navigate = useNavigate() ;

  let [ player , setPlayer ] = useState({
    'id':uuid(),
    'name':'',
    'team':'',
    'spymaster':false ,
    'admin':true 
  })


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


  // create  document  with the  generated  id
  const CreateDoc  = async () => {
    let  newDoc  = await db.collection('Rooms').add({'players':[] , 'cards':mywords , 'started':false })
    setRoomID(newDoc.id) ;
    setReady(true) ;
    console.log(newDoc.id)
  }



  const CopyCode = ()=> {
    navigator.clipboard.writeText(RoomID)
    setCopyNotifs('Copied!')
  }

  const RedirectToRoom = (x) => {


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



  return (
    <div className="text-white h-screen flex items-center justify-center ">
      <div className="w-full h-[80%]  bg-[] flex items-center  justify-center gap-12 ">
        <div className="w-[350px] flex flex-col items-center gap-10 p-6  rounded-md   relative">
        <Link rel="stylesheet" to="/" ><div className="text-[20px]">Create room</div><BiArrowBack size={25} className=' bg-blue-400 rounded-[50%] p-1 cursor-pointer absolute left-5 top-7' /></Link>
          
          <div className= 'flex flex-col gap-6 items-center mt-12' >
            
            <p onClick={CopyCode} className={`cursor-pointer min-w-[70%] mt-2 ${Ready ? 'text-[#67e8f9] ' : 'text-gray-400' }  border-b-2 px-6 pb-2 border-b-[#22d3ee] `} >
              { Ready ?  <RandomReveal
              isPlaying
              duration={1.7}
              revealDuration={0.5}
              characters= {RoomID} 
              />  : RoomID 
              }
            </p>
            
            
            {Ready && <span className= {`${copynotifs == 'Copied!' ? 'text-blue-600 ' : 'text-white'} mr-auto text-[12px] mt-[-18px] px-3 `} > {copynotifs} </span> }

            {Ready && <input value={player.name} onChange={(e)=> {setPlayer({...player , name:e.target.value})}} placeholder='Username :' id='' className=' bg-transparent min-w-[70%]  text-white border-b-2 px-4 border-b-[#22d3ee] outline-none ' />}


            { Ready ? (
                <>
                  <div className='flex gap-4 '>
                      <input type="checkbox" name="" id=""  checked ={player.team == "Team 1" ? true : false} onChange={()=> {setPlayer({...player , team:'Team 1'})}}/>
                      <span>Team 1</span>
                      <input type="checkbox" name="" id="" checked ={player.team == "Team 2" ? true : false} onChange={()=> {setPlayer({...player , team:'Team 2'})}} />
                      <span>Team 2</span>
                  </div>
                  { !spymasterExists &&
                      <div className='flex gap-4 '>
                          <input type="checkbox" name="" id="" checked ={player.spymaster} onChange={()=> {setPlayer({...player , spymaster:!player.spymaster})}} />
                          <span>Spymaster</span>
                      </div>
                  }
                <button onClick={()=> {RedirectToRoom(RoomID)}} className=" cursor-pointer  hover: text-[16px] rounded-md  tracking-wide py-2 px-6 bg-orange-500 ">
                  Access room
                </button>
                </>

            ) : (
              <button
                onClick={CreateDoc}
                className=" w-[150px] hover: text-[16px] rounded-md  tracking-wide py-2 px-6 bg-[#06b6d4] border border-blue-500 "
              >
                Generate ID
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Create;
