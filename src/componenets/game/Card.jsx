import React, { useContext, useEffect } from 'react'
import { roomContext } from '../contextAPI';
import { GiClick } from 'react-icons/gi';

function Card({ card , roomID   ,  player}) {
    let {data , setData , db} = useContext(roomContext) ;
    let room = data.find((doc) => doc.id == roomID) ;





    const flipTtheCard =  (word) => {
        // start fliping the card 
        if(room?.turn == player.team && card.flip == false && player.spymaster == false){


            db.collection('Rooms').doc(roomID).update({cards : room?.cards.map((x)=> {

                if( word.index == x.index && word.team !== 'x' ) {
                    return {...x , flip:true , by:player.team }
                }

                if( word.index == x.index && word.team == 'x'  ) {
                    // i will not  be  able  to  add  await to  this  line  because  insert  data  takes some  time 
                    db.collection('Rooms').doc(roomID).update({'gameover':true , loser:player.team})
                    
                    return {...x , flip:true , by:player.team } 
                    
                }

                db.collection('Rooms').doc(roomID).update( {fliped : room?.fliped + 1 } )

                return x

            }) } )

        }
    }






    return (
        <div onClick={()=>{flipTtheCard(card)}} key={card.word} className={ ` relative hover:shadow-lg  cursor-pointer  flex flex-col items-center justify-center rounded-lg h-[90px] w-[130px] border-4  ${ ( player?.spymaster == false && card.flip == false  )? 'bg-gray-400 border-4  border-b-blue-200 border-t-red-200' : card.color} `} >
                    
                    { player?.spymaster == false && room?.guessing == true &&player.team == room?.turn && card.flip == false && < GiClick size={30} className="absolute border-white top-[-10px] right-[-10px] " color='yellow'/> }


                    {/* <div>{card?.hover?.map((x , index)=>{
                        return <span key={index}>{x}</span>
                    } )}
                    </div> */}

                    <p className='bg-white text-black py-1 px-2 rounded-lg font-bold  shadow-lg '> {card.word} </p>
                    <div  className='absolute  bg-transparent  cursor-pointer ] h-[90px] w-[130px] '></div>
                    
                    </div>
    )
}

export default Card