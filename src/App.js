import { useEffect, useRef, useState  , useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Game from "./componenets/game/Game";
import { roomContext } from "./componenets/contextAPI";

//  import  my  db  from the  firebase  config  file  
import { db } from './firebase-config' ;
import Home from "./componenets/Join/Home";
import Lobby from "./componenets/Join/Lobby";
import Gameover from "./componenets/winorlose/Gameover";



function App() {

  let [data , setData] = useState([])

  useEffect(() => {
    const unsubscribe = db.collection('Rooms').onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setData(data);
    });

    return () => {
      unsubscribe();
    };
  }, []);


  
  return (

    <div className="App bg-[#082f49] text-white  mx-auto ">
      <roomContext.Provider value={{ data , setData , db }} >
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/lobby/:roomID" element={<Lobby />}></Route>
          <Route path="/game/:ID" element={<Game />}></Route>
          <Route path="/gameover/:ID" element={<Gameover />}></Route>
        </Routes>
      </roomContext.Provider>
    </div>
  );
}

export default App;



