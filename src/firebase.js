// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCA69Lromgeyt0CZaqxkhXH26n51d734nY",
  authDomain: "react2-d3300.firebaseapp.com",
  projectId: "react2-d3300",
  storageBucket: "react2-d3300.appspot.com",
  messagingSenderId: "867745050613",
  appId: "1:867745050613:web:5ebb66a2e14f24ca20babc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db}