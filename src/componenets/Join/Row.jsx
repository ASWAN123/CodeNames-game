import React, { useContext } from "react";
import { roomContext } from "../contextAPI";
import firebase from "firebase/compat/app";
import { act } from "react-dom/test-utils";

function Row({ x, roomID, playerID , index }) {
  let { data, setData, db } = useContext(roomContext);
  let room = data?.find((doc) => doc.id == roomID);
  let activeuser = room?.players.find((y) => y.id == playerID) ;

  const updateUser = (e) => {    
    let update = db.collection("Rooms").doc(roomID).update({players: [...room?.players.filter((player) => player.id !== activeuser.id), { ...activeuser, spymaster:false , team: e.target.value }, ],});
  };

  const turnSpymaster = (e , x) => {
    // lmohim dwa dima mzyan
    if(activeuser.team == '') return
    let team  = room?.players.filter((p) => p.team  == activeuser.team &&  p.spymaster == true && activeuser.id !== p.id)

    if(!!team.length) return 
     
    let update = db
      .collection("Rooms")
      .doc(roomID)
      .update({
        players: [
          ...room?.players.filter((player) => player.id !== activeuser.id),
          { ...activeuser, spymaster: e.target.checked },
        ],
      });
      return






    };

  return (
    <div className={`w-full flex flex-col md:flex-row justify-between px-8 py-2 ${ (index+1) % 2 === 0 ? 'border-t border-t-gray-400' : ''} `} key={x.id}>
      <p className=" w-[200px]">Name : {x.name}</p>

      <div className="flex gap-2 w-[200px]">
        <p className="">spymaster : </p>

          <input
          className={` ${ x.team == "Team 1" ? 'accent-blue-400'  : 'accent-red-400'    } `}
            type="checkbox"
            checked={  x.spymaster }
            onChange={(e) => {turnSpymaster(e , x)}}
            disabled = { (x.team == "" || activeuser?.id !== x.id  || ( room?.players.filter((p) => p.spymaster == true && p.team == activeuser?.team).length > 0 && room?.players.find((p) => p.spymaster == true && p.team == activeuser?.team)?.id !== activeuser?.id ) ) ? true : false }
          />

        


      </div>

      <div className="flex gap-2 w-[200px]">
        <p className="">team : </p>
        {playerID == x.id ? (
          <select
            
            name=""
            id=""
            className=" bg-transparent "
            onChange={updateUser}
          >
            <option value="" className="text-black">
              select team
            </option>
            <option value="Team 1" className="text-black">
              blue team
            </option>
            <option value="Team 2" className="text-black">
              red team
            </option>
          </select>
        ) : (
          <p>{x.team == "" ? "Not selected" : x.team}</p>
        )}
      </div>
    </div>
  );
}

export default Row;
