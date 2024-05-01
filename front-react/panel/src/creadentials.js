// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAT4-vWTA3PshSpdmopu9ktATphS7dg0r4",
  authDomain: "prueba-vue-18da4.firebaseapp.com",
  projectId: "prueba-vue-18da4",
  storageBucket: "prueba-vue-18da4.appspot.com",
  messagingSenderId: "54246576264",
  appId: "1:54246576264:web:9a5b98c9f7192d76b0cf3d",
  measurementId: "G-YSWSH3FKQ9",
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFirebase);

export default appFirebase;