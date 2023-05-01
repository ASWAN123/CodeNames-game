
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import uuid from "react-uuid";
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate} from "react-router-dom";
import { roomContext } from "../contextAPI";

//firebase 

import { collection , getDocs ,addDoc , updateDoc ,  doc , getDoc , setDoc } from "@firebase/firestore"

function Create() {
  let {rooms  , setRooms , RoomsCollection , db } = useContext(roomContext) ;
  let [RoomID, setRoomID] = useState("b*9***86-****-48**-87*2-");
  let [Ready, setReady] = useState(false);
  let [copynotifs , setCopyNotifs] = useState('Click to copy')
  const navigate = useNavigate() ;

  let [ player , setPlayer ] = useState({
    'id':uuid() ,
    'name':'',
    'team':'',
    'spymaster':false
  
  })


  // create  document  with the  generated  id
  const CreateDoc  = async () => {
    let  newDoc = await addDoc(RoomsCollection , {'players':[] })
    // const small_id = uuid().split('-');
    // small_id.pop() ;
    // const id = small_id.join('-')
    setRoomID(newDoc.id) ;
    setReady(true) ;
    console.log(newDoc.id)
  }



  const CopyCode = ()=> {
    navigator.clipboard.writeText(RoomID)
    setCopyNotifs('Copied!')
  }

  const RedirectToRoom = async (x) => {
    // add the  player 
    // target room 
    let room = doc( db  , 'Rooms' ,  RoomID )

    const data  = await getDoc(room) ;

    let newField =  { 'players' : [...data.data().players , player]  }

    let updateRoom  = await setDoc(room ,  newField , {merge:true})

    navigate(`/game/${x}`, {
      state: {
        roomID: x ,
      }
    });
  }

  return (
    <div className="text-white h-screen flex items-center justify-center">
      <div className="w-full h-[80%]  bg-[] flex items-center  justify-center gap-12 ">
        <div className="w-[350px] flex flex-col items-center gap-10 p-6  rounded-md  bg-green-950 relative">
        <Link rel="stylesheet" to="/" ><BiArrowBack size={25} className=' cursor-pointer absolute left-5 top-7' /></Link>
          {/* <div className="text-[20px]">Create room</div> */}
          <div className= 'flex flex-col gap-6 items-center mt-12' >
            
            <p onClick={CopyCode} className={`cursor-pointer min-w-[70%] mt-2 ${Ready ? 'text-blue-500 ' : 'text-gray-400' }  border-b-2 px-6 pb-2 border-b-[#9CC88D] `} >
              {RoomID}
            </p>
            
            
            {Ready && <span className= {`${copynotifs == 'Copied!' ? 'text-blue-600 ' : 'text-white'} mr-auto text-[12px] mt-[-18px] px-3 `} > {copynotifs} </span> }

            {Ready && <input value={player.name} onChange={(e)=> {setPlayer({...player , name:e.target.value})}} placeholder='Username :' id='' className=' bg-transparent min-w-[70%]  text-gray-400 border-b-2 px-4 border-b-[#9CC88D] outline-none ' />}


            { Ready ? (
                <>
                  <div className='flex gap-4 '>
                      <input type="checkbox" name="" id=""  checked ={player.team == "Team 1" ? true : false} onChange={()=> {setPlayer({...player , team:'Team 1'})}}/>
                      <span>Team 1</span>
                      <input type="checkbox" name="" id="" checked ={player.team == "Team 2" ? true : false} onChange={()=> {setPlayer({...player , team:'Team 2'})}} />
                      <span>Team 2</span>
                  </div>
                      <div className='flex gap-4 '>
                          <input type="checkbox" name="" id="" checked ={player.spymaster} onChange={()=> {setPlayer({...player , spymaster:!player.spymaster})}} />
                          <span>Spymaster</span>
                      </div>
                <Link onClick={()=> {RedirectToRoom(RoomID)}} className=" cursor-pointer  hover: text-[16px] rounded-md  tracking-wide py-2 px-6 bg-orange-500 ">
                  Access room
                </Link>
                </>

            ) : (
              <button
                onClick={CreateDoc}
                className=" w-[150px] hover: text-[16px] rounded-md  tracking-wide py-2 px-6 bg-[#0F2A25] border border-orange-500 "
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
