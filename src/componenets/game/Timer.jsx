import React, { useContext, useEffect, useState } from "react";
import { roomContext } from "../contextAPI";
import { useLocation } from "react-router-dom";

function Timer({ seconds }) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  let { data, setData, db } = useContext(roomContext);
  const location = useLocation();
  let parseStuff = location.pathname.replace("/game/", "").split("-");
  let roomID = parseStuff.at(0);
  let playerID = parseStuff.at(-1);

  let room = data?.find((doc) => doc.id == roomID);
  let player = room?.players.find((p) => p.id == playerID);


  useEffect(() => {
    if (timeLeft > 0 && player.admin == true) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        const minutes = Math.floor(timeLeft / 60);
        const secondsRemaining = timeLeft % 60;

        let x = `${minutes < 10 ? "0" + minutes : minutes}:${secondsRemaining < 10 ? "0" + secondsRemaining : secondsRemaining}`
            db.collection('Rooms').doc(roomID).update(({ 'countor': x }))
        if(timeLeft == 1){
          db.collection('Rooms').doc(roomID).update(({ guessing:false ,'turn': room?.turn == 'Team 1' ? 'Team 2' :  'Team 1' }))
        }
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [timeLeft]);



  return (
    <div>
      {room?.countor}
    </div>
  );
}

export default Timer;
