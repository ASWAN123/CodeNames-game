import React, { useContext, useState } from "react" ;
import { roomContext } from "../contextAPI" ;
import { useEffect } from "react" ;

function TeamCard({ roomID , teamName }) {

  let { data, db } = useContext(roomContext) ;
  let room = data.find((doc) => doc.id == roomID) ;

 





  return (

    <div className=" flex flex-col gap-4 p-1 ">
      {teamName == "Team 1" && (
        <div className="bg-green-300 text-black w-[100px] rounded-lg  text-center  p-1 absolute top-2 left-2 ">
          <p>
            Online : {data.find((doc) => doc.id == roomID)?.players?.length}{" "}
          </p>
        </div>
      )}
      <div
        className={` p-2 card w-[270px]  flex flex-col gap-4  rounded-lg mt-6  bg-gradient-to-r ${
          teamName == "Team 2"
            ? "from-[#6366f1] to-[#818cf8]"
            : "from-[#ec4899] to-[#db2777]"
        }  `}
      >
        <div className="flex gap-2 text-[25px] items-center px-2 ">
          <p>{room?.cards.filter((card)=> card.flip == false && card.team == teamName).length} Words left</p>

          {room?.guessing && room.turn == teamName && (
            <span className="bg-green-400 p-1 rounded-lg  text-[14px] ">
               seconds
            </span>
          )}
        </div>

        <div className="flex flex-col px-4 gap-1">
          <p className="border-b-2 ">Operatives</p>
          <div className="flex gap-2 ">
            {room?.players
              .filter((player) => player.team == teamName)
              .map((player) => {
                if (player.spymaster === false) {
                  return (
                    <span
                      key={player.id}
                      className={`bg-white ${
                        teamName == "Team 2"
                          ? " text-[#818cf8]"
                          : " text-[#db2777]"
                      }   rounded-lg px-1  `}
                    >
                      {player.name}
                    </span>
                  );
                }
              })}
          </div>
          
          <p className="border-b-2">Spymaster</p>
          <div className="flex gap-2 ">
            {room?.players
              .filter((player) => player.team == teamName)
              .map((player) => {
                if (player.spymaster === true) {
                  return (
                    <span
                      key={player.id}
                      className={`bg-white   ${
                        teamName == "Team 2"
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
