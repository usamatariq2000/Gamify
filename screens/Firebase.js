// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBesB8C3oH2o3Kh8kU2Whvj5jO36C_KCB4",
  authDomain: "mobileproject-2d8cf.firebaseapp.com",
  projectId: "mobileproject-2d8cf",
  storageBucket: "mobileproject-2d8cf.appspot.com",
  messagingSenderId: "368830975194",
  appId: "1:368830975194:web:09ae912b3209fa026ce9e3",
  measurementId: "G-5887HZLZYB",
};

const data = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(data);

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const auth = firebase.auth();
export { auth };
