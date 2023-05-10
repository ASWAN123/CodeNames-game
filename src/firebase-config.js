
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


const firebaseConfig =process.env.REACT_APP_API_KEY

//do connection but not  sure
firebase.initializeApp(firebaseConfig);
// confirm  the  connection  
export const db = firebase.firestore();

// export default db ;

