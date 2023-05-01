import { useEffect, useRef, useState  , useContext } from "react";
import CreateRoom from "./componenets/Join/CreateRoom";
import { Route, Routes } from "react-router-dom";
import Create from "./componenets/Join/Create";
import Connect from "./componenets/Join/Connect";
import Game from "./componenets/game/Game";
import { roomContext } from "./componenets/contextAPI";

// firebase
import {db} from './firebase-config'
import { collection , getDocs ,addDoc } from "@firebase/firestore"



function App() {

  let [rooms , setRooms] = useState([]) ;
  let  [buildingRoom , setBuildingRoom] = useState('')
  const RoomsCollection = collection(db , 'Rooms')

  // useEffect(()=> {
  //   const  getRooms = async ()=> {
  //     const  data  = await getDocs(RoomsCollection) ;
  //     data.docs.map((doc)=> {
  //       setRooms( [...rooms , {id:doc.id , ...doc.data() }])
  //     })
  //   }

  //   getRooms() ;
  // } , [])


  // update db
  useEffect(() => {
    console.log('test ')

  } , [rooms] )











  
  return (

    <div className="App bg-[#071715] text-white ">
      <roomContext.Provider value={{ rooms , setRooms , RoomsCollection , db }}>
        <Routes>
          <Route path="/" element={<CreateRoom />}></Route>
          <Route path="/Create" element={<Create />}></Route>
          <Route path="/Connect" element={<Connect />}></Route>
          <Route path="/game/:ID" element={<Game />}></Route>
        </Routes>
      </roomContext.Provider>

    </div>
  );
}

export default App;
