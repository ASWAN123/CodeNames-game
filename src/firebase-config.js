
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


const firebaseConfig =  {
    apiKey: process.env.REACT_APP_API_KEY ,
    authDomain: "hero3-f7cc1.firebaseapp.com" ,
    projectId: "hero3-f7cc1" ,
    storageBucket: "hero3-f7cc1.appspot.com" ,
    messagingSenderId: "1097431111167" ,
    appId: "1:1097431111167:web:b513a28a4a779ee22643ca"
  }; 

//do connection but not  sure
firebase.initializeApp(firebaseConfig);
// confirm  the  connection  
export const db = firebase.firestore();



