// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVj7C8_XyyVQDr1puk3zFvWMvwmVyk-M4",
  authDomain: "inventory-management-app-11796.firebaseapp.com",
  projectId: "inventory-management-app-11796",
  storageBucket: "inventory-management-app-11796.appspot.com",
  messagingSenderId: "833986202715",
  appId: "1:833986202715:web:87dff3ed9742b86c16837e",
  measurementId: "G-EJGDMSDVWM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getFirestore(app)
export {database}
