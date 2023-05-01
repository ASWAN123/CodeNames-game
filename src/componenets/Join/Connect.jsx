import React, { useState , useContext } from 'react'
import { Link } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi';
import { roomContext } from "../contextAPI";


//firebase
import { collection , getDocs ,addDoc , updateDoc ,  doc , getDoc , setDoc } from "@firebase/firestore"

function Connect() {
    let {rooms  , setRooms , RoomsCollection , db } = useContext(roomContext) ;

    let [ validatTOKEN  , setValidatTOKEN] = useState(true)
    let [message ,  setMessage] = useState() // Not Valid

    let [ roomID  , setRoomID] = useState() ;
    
    const checkValidationRoomID =async (e) => {
        setRoomID(e.target.value)
        let checker = doc( db  , 'Rooms' ,  e.target.value )
        const data  = await getDoc(checker) ;
        console.log(data)
        
    }






    return (
        <div className='text-white h-screen flex items-center justify-center'>
            <div className='w-full h-[80%]  bg-[] flex items-center  justify-center gap-12 '>
                <div className='w-[400px] flex flex-col items-center gap-10 p-6  rounded-md  bg-green-950 relative'>
                    <div className='flex gap-3 items-center w-full '><Link rel="stylesheet" to="/" ><BiArrowBack size={25} className=' cursor-pointer ' /></Link> <p className='text-[20px] '>Connect to an existing room</p></div>
                    <div className=' flex flex-col gap-6 items-center'>
                        {/* <label htmlFor="">Add room ID : </label> */}
                        <input value={roomID} onChange={(e)=> {checkValidationRoomID(e)}} placeholder='Add you room ID' id='' className=' bg-transparent min-w-[70%] mt-2 text-gray-400 border-b-2 px-6 border-b-[#9CC88D] outline-none ' />
                        
                        { validatTOKEN && <span className={`${message == 'Valid' ? 'text-blue-600 ' : 'text-red-300'} mr-auto text-[12px] mt-[-18px] `}> {message} </span> }

                        <input  placeholder='Add your Username' id='' className=' bg-transparent min-w-[70%]  text-gray-400 border-b-2 px-6 border-b-[#9CC88D] outline-none ' />

                        <div className='flex gap-4 '>
                            <input type="checkbox" name="" id="" />
                            <span>Team 1</span>
                            <input type="checkbox" name="" id="" />
                            <span>Team 2</span>
                        </div>
                        <div className='flex gap-4 '>
                            <input type="checkbox" name="" id="" />
                            <span>Spymaster</span>
                        </div>

                        <Link to="/Connect">
                            <button className='w-[150px] h-[40px]  text-[16px] rounded-md  tracking-wide py-2 px-6 bg-[#0F2A25] border border-blue-500'>Join   Room</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
} 

export default Connect