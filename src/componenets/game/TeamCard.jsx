import React, { useContext, useState } from "react" ;
import { roomContext } from "../contextAPI" ;
import { useEffect } from "react" ;
import { useLocation } from "react-router-dom";
import Timer from "./Timer";



function TeamCard({  teamName }) {
  const location = useLocation() ;
  let parseStuff = location.pathname.replace('/game/','').split('-') ;
  let roomID = parseStuff.shift()
  let playerID = parseStuff.join("-") ;


  let { data, db } = useContext(roomContext) ;
  let room = data.find((doc) => doc.id == roomID) ;
  let player  = room?.players.find((p) => p.id  == playerID )












  return (

    <div className=" flex flex-col gap-2 ">
      <div
        className={` p-2 card w-[240px]  flex flex-col gap-2  rounded-lg mt-6  bg-gradient-to-r ${
          teamName == "Team 1"
            ? "from-blue-600 to-blue-500"
            : "from-red-600 to-red-500"
        }  `}
      >
        <div className="flex gap-2 text-[20px] items-center px-1 ">
          <p>{room?.cards.filter((card)=> card.flip == false && card.team == teamName).length} Words left</p>

          <span className="  rounded-lg bg-white text-black ml-auto px-1 text-[16px]">
               {room?.turn == teamName ?  <Timer seconds = {room?.timer} /> : '00:00' }
            </span>


        </div>

        <div className="flex flex-col px-2 gap-1">
          <p className="border-b-2 ">Operatives</p>
          <div className="flex gap-2  flex-wrap ">
            {room?.players
              .filter((player) => player.team == teamName)
              .map((player) => {
                if (player.spymaster === false) {
                  return (
                    <span
                      key={player.id}
                      className={`bg-white ${teamName == "Team 1"? " text-[#818cf8]": " text-[#db2777]" }   rounded-lg px-1  `}>
                      {player.name}
                    </span>
                  );
                }
              })}
          </div>
          
          <p className="border-b-2">Spymaster</p>
          <div className="flex gap-2 flex-wrap ">
            {room?.players
              .filter((player) => player.team == teamName)
              .map((player) => {
                if (player.spymaster === true) {
                  return (
                    <span
                      key={player.id}
                      className={`bg-white   ${
                        teamName == "Team 1"
                          ? " text-[#818cf8]"
                          : " text-[#db2777]"
                      } rounded-lg px-1  `}
                    >
                      {player.admin ? "admin:" : ""}
                      {player.name}
                    </span>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamCard;
