
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';



// const firebaseConfig = {
//   apiKey: "AIzaSyCKIoRVDYm7sn15sOSZT51GG8gRMLaMEP0",
//   authDomain: "codenames-game-c7af4.firebaseapp.com",
//   databaseURL: "https://codenames-game-c7af4-default-rtdb.firebaseio.com",
//   projectId: "codenames-game-c7af4",
//   storageBucket: "codenames-game-c7af4.appspot.com",
//   messagingSenderId: "1014232001954",
//   appId: "1:1014232001954:web:8a7264d5a6707aed74d6fb"
// };
const firebaseConfig = {
  apiKey: "AIzaSyCBHbFdwSi0LzZwL1bIABymejq0g3Y0e2A",
  authDomain: "hero-4b3ba.firebaseapp.com",
  projectId: "hero-4b3ba",
  storageBucket: "hero-4b3ba.appspot.com",
  messagingSenderId: "750737514232",
  appId: "1:750737514232:web:0139aba9a17c23c0ac250d"
};

//do connection but not  sure  
firebase.initializeApp(firebaseConfig);
// confirm  the  connection  
export const db = firebase.firestore();

// export default db ;

