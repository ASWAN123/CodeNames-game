
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAFQM-I8diz33JnGIusMlzj-1EubQP7DUM",
  authDomain: "hero2-21375.firebaseapp.com",
  projectId: "hero2-21375",
  storageBucket: "hero2-21375.appspot.com",
  messagingSenderId: "301818965449",
  appId: "1:301818965449:web:43128c99f13b9d046b8c18"
};

//do connection but not  sure  
firebase.initializeApp(firebaseConfig);
// confirm  the  connection  
export const db = firebase.firestore();

// export default db ;

