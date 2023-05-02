
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyCKIoRVDYm7sn15sOSZT51GG8gRMLaMEP0",
  authDomain: "codenames-game-c7af4.firebaseapp.com",
  databaseURL: "https://codenames-game-c7af4-default-rtdb.firebaseio.com",
  projectId: "codenames-game-c7af4",
  storageBucket: "codenames-game-c7af4.appspot.com",
  messagingSenderId: "1014232001954",
  appId: "1:1014232001954:web:8a7264d5a6707aed74d6fb"
};

//do connection but not  sure  
firebase.initializeApp(firebaseConfig);
// confirm  the  connection  
export const db = firebase.firestore();

// export default db ;

