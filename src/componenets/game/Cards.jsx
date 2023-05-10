import React, { useContext, useEffect, useState } from "react";
import { roomContext } from "../contextAPI";
import firebase from "firebase/compat/app"; //firebase
import Card from "./Card";
import { useLocation, useNavigate } from "react-router-dom";


function Cards() {
    const location = useLocation();

    let parseStuff = location.pathname.replace("/game/", "").split("-");
    let roomID = parseStuff.shift();
    let playerID = parseStuff.join("-");

    let { data, setData, db } = useContext(roomContext);
    let [guess, setGuess] = useState("");
    let [words , setWords] = useState(1) ;

    let room = data?.find((doc) => doc.id == roomID);
    let player = room?.players?.find((player) => player.id == playerID);




    const  giveClue = () => {
        if(guess == '') return
        db.collection('Rooms').doc(roomID).update(({ guessing: true  ,  guessValue : guess , flip:words}))
        setGuess("")
        setWords(1)
    }

    




    return (
        <div className=" w-full flex flex-col gap-2 items-center relative">

            {/* show the  hint  to  players */}
            { player?.spymaster == false && room?.guessing == true && room?.turn == player.team && <div className='px-2 py-1 mx-auto rounded-lg absolute top-6  text-black font-bold text-[18px]  bg-white '>{room?.guessValue} | {room?.flip}</div> }
            { room?.guessing == true && room?.turn !== player.team && <div className='px-2 py-1 mx-auto rounded-lg absolute top-6  text-black font-bold text-[18px]  bg-white '>other team  is  playing</div> }


            <div className="grid grid-cols-5 gap-2 p-1 min-w-[60%] max-w-[80%] my-auto">

                {room?.cards?.map((card) => {
                    return (
                        <Card
                            key={card.index}
                            card={card}
                        />
                    );
                })}

            </div>

            {room?.started == true && room?.guessing == false &&
                player?.spymaster == true &&
                room?.turn == player.team && (
                    <div className="  rounded-lg text-center p-1 max-w-[80%] justify-center   absolute -bottom-12 lg:bottom-10  ">
                        <div className="flex  justify-center  gap-2 ">
                            <input
                                value={guess}
                                onChange={(e) => {
                                    setGuess(e.target.value);
                                }}
                                type="text"
                                name=""
                                id=""
                                className="w-[60%] outline-none h-8 bg-white rounded-lg text-black p-2 "
                            />
                            <select name="" id=""  onChange={(e) => {setWords(e.target.value)}} className="bg-transparent p-1 rounded-lg text-white border">
                                <option className="text-black " value="1">1</option>
                                <option className="text-black " value="2">2</option>
                                <option className="text-black " value="3">3</option>
                                <option className="text-black " value="4">4</option>
                            </select>
                            {/* <input className=" p-2 w-[40px] bg-white text-black rounded-lg"  value={words} onChange={(e) => {setWords(e.taregt.value)}}/> */}
                            <button
                                onClick={giveClue}
                                className="bg-green-600 px-3 py-1 rounded-lg "
                            >
                                Give Clue
                            </button>
                        </div>
                    </div>
                )}



            {/* show the the hint to the  spymaster*/}
            { player?.spymaster == true && room?.guessing == true && room?.turn == player.team && <div className='px-2 py-1 mx-auto   rounded-lg  absolute top-6  text-black font-bold text-[18px]  bg-white '>{room?.guessValue} | {room?.flip}</div> }
            
        </div>
    );
}

export default Cards;
