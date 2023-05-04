import { useEffect, useRef, useState  , useContext } from "react";
import CreateRoom from "./componenets/Join/CreateRoom";
import { Route, Routes } from "react-router-dom";
import Create from "./componenets/Join/Create";
import Connect from "./componenets/Join/Connect";
import Game from "./componenets/game/Game";
import { roomContext } from "./componenets/contextAPI";

//  import  my  db  from the  firebase  config  file  
import { db } from './firebase-config' ;




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

    <div className="App bg-blue-900 text-white ">

      <roomContext.Provider value={{ data , setData , db }} >
        <Routes>
          <Route path="/" element={<CreateRoom />}></Route>
          <Route path="/Create" element={<Create />}></Route>
          {/* <Route path="/Connect" element={<Connect />}></Route>
          <Route path="/game/:ID" element={<Game />}></Route> */}
        </Routes>
      </roomContext.Provider>

    </div>
  );
}

export default App;



