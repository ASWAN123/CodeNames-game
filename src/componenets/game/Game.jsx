import React from 'react'
import { useLocation } from "react-router-dom";

function Game() {

  const location = useLocation();
  // get 
  let roomID = location.state.roomID;


  return (
    <div>this  is  my id {roomID} </div>
  )
}

export default Game