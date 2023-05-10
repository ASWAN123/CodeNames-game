import React, { useContext, useEffect, useState } from 'react' ;
import { Link, useNavigate , Route , Router } from 'react-router-dom' ;
import { roomContext } from '../contextAPI' ; 
import uuid from "react-uuid" ;
import mywords from "../../randomWords" ;
import firebase from 'firebase/compat/app' ;
import Loading from '../loading/Loading';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';


function Home() {
    let {data  , setData  ,  db }  = useContext(roomContext)
    let [create ,  setCreate] = useState(false)
    let [join , setJoin] = useState(false)
    let [roomID  ,  setRoomID] = useState('')
    let [copypast , setCopypast] = useState('')
    let navigate = useNavigate()
    let [player   , setPlayer] = useState({id:uuid().split('-').at(0) ,name:'' , team:'' , spymaster:false })
    let [loading , setLoading ] = useState(false)




    const CopyCode = ()=> {
        navigator.clipboard.writeText(roomID)
        setCopypast('Copied! Share with your friends')
        console.log('ok')
      }

    const createDoc = async () => {
        if(roomID.length == 20 && player.name.trim() == '' && create == true) return 
        if(player.name.trim().length > 0 && roomID.length == 20 ){
            setLoading(true)
            await db.collection('Rooms').doc(roomID).update({players:firebase.firestore.FieldValue.arrayUnion({...player ,  admin:true })})
            navigate('/lobby/'+roomID+"-"+player.id)
            return
        }

        setCreate(true) ;
        setRoomID('generating room ID ... ')
        let  newDoc  = await db.collection('Rooms').add({'players':[] , 'gameover':false  , 'cards':mywords(1) , 'started':false , timer:'' })
        setRoomID(newDoc.id) ;
        setCopypast('Click to copy')
        setLoading(false)
        return 
    }



    const joinUser = async () => {
        if( data.find((doc) => doc.id  == roomID) !== undefined && !!player.name.trim().length ){
            setLoading(true)
            await db.collection('Rooms').doc(roomID).update({players:firebase.firestore.FieldValue.arrayUnion({...player ,  admin:false})})
            setLoading(false)
            navigate('/lobby/'+roomID+"-"+player.id)
            return 
            
        }

        return 
    }

    const checkingValidation  = (e) => {
        setRoomID(e.target.value)
        let checkerExist = data.find((doc) => doc.id == e.target.value)
        if(e.target.value.length !== 20 ){
            setCopypast('room ID is only 20 length')
            return 
        }
        if(checkerExist !== undefined){
            setCopypast('Valid room ID')
            return 
        }else{
            setCopypast('Room id is not valid')
            return 

        }
    }



    const  goBack  = () => {
        setCreate(false)
        setJoin(false)
        setRoomID('')
    }




    return (
        <div className='min-h-screen flex flex-col gap-6 items-center justify-center '>
            {
                loading && <Loading />
            }

            <p className='text-7xl mb-10 top-20 '>CodeNames</p>
            
            {/* create a new room */}
            { create && <div className='w-[350px] flex flex-col gap-6 ' >
                <p onClick={ create ? CopyCode : '' }  className='w-full bg-transparent h-[30px] border-b-2 border-b-blue-300 text-blue-200 p-4 pb-8 outline-none  cursor-pointer text-center'>{roomID}</p> 
                <span className='-mt-4 text-[12px]'  >{copypast}</span>
                <input placeholder='username:' value={player.name}  onChange={(e)=> {setPlayer({...player ,  name:e.target.value})}} type="text" name="" id=""  className='w-full bg-transparent h-[30px] border-b-2 border-b-blue-300 text-blue-200 p-4 outline-none text-center'/>
            </div> }


            {/* connect to  a  existing room */}
            { join && <div className='w-[350px] flex flex-col gap-6 ' >
                <input placeholder='Room ID'  value={roomID} onChange={(e)=>{checkingValidation(e)} } type="text"  className='w-full bg-transparent h-[30px] border-b-2 border-b-blue-300 text-blue-200 p-4  outline-none  text-center '/>
                <span className='-mt-4 text-[12px]'  >{copypast}</span>
                <input placeholder='username:' value={player.name}  onChange={(e)=> {setPlayer({...player ,  name:e.target.value})}} type="text" name="" id=""  className='w-full bg-transparent h-[30px] border-b-2 border-b-blue-300 text-blue-200 p-4 outline-none text-center'/>
            </div>}
            
            
            {/* button  create  join  */}
            <div className='flex flex-col gap-4 mt-6'>

                { !join &&
                
                <button onClick={ createDoc} className={`w-[200px] h-[50px] text-[16px] border-2 text-center ${!!player.name.length ? "border-orange-500" : "border-white"}`}>{ !!player.name.length  ? "Access lobby" :"Create Room"}</button>
                
                }


                { !create && 
                
                <button onClick={ join ? joinUser : ()=> {setJoin(true)} } className={` w-[200px] h-[50px] text-[16px] border-2 text-center ${ ( copypast == 'Valid room ID'  && !!player.name.length ) ? " border-orange-500" : "border-white"}`}>{ ( copypast == 'Valid room ID'  && !!player.name.length )  ? "Access lobby" :"Join Room"}
                </button> 

                }

                {  create &&  <div onClick={goBack} className=' cursor-pointer flex justify-center items-center ' >
                    <MdOutlineArrowBackIosNew size={35} className='p-1 rounded-[50%] bg-gray-200 text-black text-center' />
                </div> }

                { join &&  <div onClick={goBack} className=' cursor-pointer flex justify-center items-center ' >
                    <MdOutlineArrowBackIosNew size={35} className='p-1 rounded-[50%] bg-gray-200 text-black text-center' />
                </div> }
            </div>

        </div>
    )
}

export default Home