import React, { useContext, useEffect } from "react";
import { roomContext } from "../contextAPI";
import { GiClick } from "react-icons/gi";
import { useLocation, useNavigate } from "react-router-dom";

function Card({ card }) {
  const location = useLocation();
  let parseStuff = location.pathname.replace("/game/", "").split("-");
  let roomID = parseStuff.shift();
  let playerID = parseStuff.join("-");
    let navigate = useNavigate()
  let { data, setData, db } = useContext(roomContext);
  let room = data.find((doc) => doc.id == roomID);
  let player = room?.players?.find((player) => player.id == playerID);

  const flipTtheCard = (card) => {
    // start fliping the card
    if (player.spymaster == true) return ;
    if (room?.turn !== player.team) return ;
    if (card.flip == true) return ;
    
    
    if(room?.forbiddencard == true  && card.team  == 'x') {
        db.collection("Rooms").doc(roomID).update({ gameover:true  ,  turn: ""  ,  guessing:false , flip:'done' ,  winner:room?.turn == "Team 1" ?  "Team 2":  "Team 1" });
        return 
    }

    let newcards = room?.cards.map((x) => {
        if (x.word == card.word ) {
          return { ...x, flip: true } ;
        }
        return x;

        });
    
        console.log(newcards.filter((x)=> x.flip == true).length ,  'cards count  for ' ,  player?.team)
    if( newcards.filter((x)=> x.team == room?.turn && x.flip == true ).length === 8 ){
        console.log('because  it  8' , newcards.filter((x)=> x.flip == true && card.team == room?.turn ).length  )
        db.collection("Rooms").doc(roomID).update({ turn: ""  , cards: newcards  ,  flip:0  ,  guessing:false , flip:'done' ,  winner:room?.turn , gameover:true });
        return
    }

    let flipcount  = room?.flip
    db.collection("Rooms").doc(roomID).update({ cards: newcards  ,  flip:flipcount-1 });
      
  };








  const hoverfunction = (card) => {
    if (player.spymaster == true) return;
    if (room?.turn !== player.team) return;

    let updatedcards = room?.cards.map((x) => {

        if( !!card.hover.filter((y) => y.id == player.id).length && card.word == x.word && card.team == x.team ){
            return { ...x, hover: [...x.hover.filter((y) => y.id !== player.id  ) ] };
        }

        if (card.word == x.word && card.team == x.team) {
            return { ...x, hover: [...x.hover.filter((y) => y.id !== player.id ) , player] };
        }

        return x ;
    });

    db.collection("Rooms").doc(roomID).update({ cards: updatedcards });
  };

  return (
    <div className="relative">
        {player?.spymaster == false &&
          card.flip == false &&
          player?.team == room?.turn &&
          room?.guessing == true && (
            <GiClick
              size={30}
              onClick={() => {
                flipTtheCard(card);
              }}
              className="absolute cursor-pointer top-[-10px] right-[-5px]  bg-yellow-300 rounded-2xl p-1 rotate-45 "
              color="white"
            />
          )}

      <div
        onClick={() => {
          hoverfunction(card);
        }}
        key={card.word}
        className={` hover:shadow-lg  cursor-pointer  flex flex-col items-center justify-center rounded-lg min-h-[100px] min-w-[170px]   shadow-inner  border-4 border-gray-100 hover:scale-[0.9] ${
          player?.spymaster == false && card.flip == false
            ? " bg-orange-300"
            : card.color
        } `}
      >


        <div className="flex gap-2 ">
          {card.hover.map((x) => {
            return <span>{x.name}</span>;
          })}
        </div>

        <p className=" text-black bg-gray-50 py-1 px-2 rounded-lg font-bold   mt-auto mb-1  ">
          {" "}
          {card.word}
        </p>
        <div className="absolute  bg-transparent  cursor-pointer ] h-[90px] w-[130px] "></div>
      </div>
    </div>
  );
}

export default Card;
