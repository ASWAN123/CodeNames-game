import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { roomContext } from '../contextAPI';
import Row from './Row';
import firebase from 'firebase/compat/app' ;
import mywords from '../../randomWords';
import Loading from '../loading/Loading';


function Lobby() {
    let  {data  ,  setData  ,  db } = useContext(roomContext)
    let [loading  ,  setLoading] = useState(false)
  
    const location = useLocation() ;
    let parseStuff = location.pathname.replace('/lobby/','').split('-') ;
    let roomID = parseStuff.at(0) ;
    let playerID = parseStuff.at(-1) ;
    let navigate = useNavigate() ;

    let  room = data?.find((doc) => doc.id == roomID )


    let  user = room?.players.find((x)=> x.id == playerID )
    
    let waitingUser = room?.players?.filter((p) => p.team == '')  ;
    let blueTeam =  room?.players?.filter((p) => p.team == 'Team 1')    ; 
    let redTeam =  room?.players?.filter((p) => p.team == 'Team 2')     ;

    const setTimer = (e) => {
        let  time  = e.target.value 
        db.collection('Rooms').doc(roomID).update({ timer : time })
    }

    const  WithforbiddenCard = (e) => {
        let  option  =  e.target.checked ;
        if(option == true){
            db.collection('Rooms').doc(roomID).update({cards:mywords(-1) , forbiddencard:true})
        }else{
            db.collection('Rooms').doc(roomID).update({cards:mywords(1) , forbiddencard:false})
        }
        
        
    }

    useEffect(()=> {
        if(room?.started == true){
            setLoading(false)
            navigate('/game/'+roomID+'-'+playerID) ;
        }
    } , [room])


    const startgame = async() => {
        let team1 = room?.players.filter((p) => p.team == "Team 1" ) ;
        let team2 = room?.players.filter((p) => p.team == "Team 2" ) ;
        if ( team1.find((p)=> p.spymaster == true) == undefined || team1.find((p)=> p.spymaster == false) == undefined  ) return 
        if ( team2.find((p)=> p.spymaster == true) == undefined || team2.find((p)=> p.spymaster == false) == undefined  ) return 
        // check  if  there is  more than  2  players  in each  team  and  one  spy and  one  operative
        setLoading(true)

        if(room?.timer == ''){
           await db.collection('Rooms').doc(roomID).update({timer:'60'})
        }
        await db.collection('Rooms').doc(roomID).update({started:true , turn:user.team , guessing:false ,  winner:''})

    }




    return (
        <div className=' min-h-screen  max-w-7xl pt-6 px-6   gap-6 flex flex-col w-full mx-auto '>
            {
                loading && <Loading />
            }
                <div className=' flex gap-12  justify-between '>

                    <div className='flex gap-4   p-2 items-center  justify-center text-[18px] font-normal ' >
                        <span>Welcome : </span>
                        <span>{user?.name}</span>
                    </div>
                    
                    <div className='flex gap-4   p-2 items-center  justify-center text-[18px] font-normal ' >
                        <span>Players : </span>
                        <span>{room?.players.length}</span>
                    </div>
                    
                    <div className='flex gap-4   p-2 items-center  justify-center text-[18px] font-normal ' >
                        <span>Admin : </span>
                        <span>{room?.players.find((x) => x.admin == true)?.name}</span>
                    </div>

                    <div className='flex gap-4   p-2 items-center  justify-center text-[18px] font-normal ' >
                        <span>RoomID : </span>
                        <span>{roomID}</span>
                    </div>

                </div>

                <div className=' flex gap-8 justify-between'>
                
                    {/* table */}
                    <div className=''>
                        <div className=' flex flex-col gap-0 bg-gradient-to-b from-gray-200/50 to-[#082f49]/50'>
                                <p className='p-2 pb-2 border-b-2 '>waiting list</p>
                                {
                                    waitingUser?.map((x ,  index)=> {
                                        return <Row index={index} key={x.id} x = {x} roomID={ roomID} playerID={playerID}/>
                                    })
                                }
                            </div>

                        <div className=' flex flex-col gap-0 bg-gradient-to-b from-blue-300/50 to-[#082f49]/50'>
                            <p className='p-2 pb-2 border-b-2 border-b-blue-500'>blue team</p>
                            {
                                blueTeam?.map((x , index)=> {
                                    return <Row index={index} key={x.id} x = {x} roomID={ roomID} playerID={playerID}/>
                                })
                            }
                        </div>


                        <div className=' flex flex-col gap-0 bg-gradient-to-b from-red-300/50 to-[#082f49]/50'>
                            <p className='p-2 pb-2 border-b-2 border-b-red-500'>red team</p>
                            {
                                redTeam?.map((x , index)=> {
                                    return <Row index={index} key={x.id} x = {x} roomID={ roomID} playerID={playerID}/>
                                })
                            }
                        </div>
                            

                    </div>
                    {/* controllers */}
                    <div className=' min-w-[300px] my-auto flex flex-col gap-6   px-6 '>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="">Hint time</label>
                            <select value={ room?.timer } name="" id="" className='bg-transparent border h-8 rounded text-center ' onChange={setTimer} disabled={ user?.admin == true ? false : true } title='Only admin can change this input'> 
                                <option  className='bg-[#082f49] text-white ' value="60">1 min</option>
                                <option  className='bg-[#082f49] text-white ' value="90">1.5 min</option>
                                <option  className='bg-[#082f49] text-white ' value="120">2 min</option>
                            </select>
                        </div>
                        <div className='flex gap-2'>
                            <input onChange={WithforbiddenCard} type="checkbox" name="" id="" className=''  disabled={ user?.admin == true ? false : true } title='Only admin can change this input' />
                            <label htmlFor="">Include forbidden card</label>
                        </div>
                        <input onClick={startgame} type='button' className='px-6 py-1 bg-green-500  cursor-pointer  rounded ' value='Start Game' disabled={ user?.admin == true ? false : true } title='Only admin can change this input' />
                    </div>

                </div>



            
        </div>
    )
}

export default Lobby