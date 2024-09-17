// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqMOMyjnlwoIUkTrULweFd9525lA8_72M",
  authDomain: "to-d-o-019c6g.firebaseapp.com",
  projectId: "to-d-o-019c6g",
  storageBucket: "to-d-o-019c6g.appspot.com",
  messagingSenderId: "268479064318",
  appId: "1:268479064318:web:db622046047c404c171daf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;