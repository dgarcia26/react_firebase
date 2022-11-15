// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxKOdfiDwBFTzN1nRenQZXUAcdhhv7aTY",
  authDomain: "calidadsoft-9b09f.firebaseapp.com",
  projectId: "calidadsoft-9b09f",
  storageBucket: "calidadsoft-9b09f.appspot.com",
  messagingSenderId: "766731922304",
  appId: "1:766731922304:web:9cb22b2836b76d492def65"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db}