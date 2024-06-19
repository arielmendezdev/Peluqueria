// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAm2dKgCpdla0F17cclVbvT4gAqHPI1cw",
  authDomain: "peluqueria-d742a.firebaseapp.com",
  projectId: "peluqueria-d742a",
  storageBucket: "peluqueria-d742a.appspot.com",
  messagingSenderId: "757989764179",
  appId: "1:757989764179:web:67539efe199c9501516aa6",
  measurementId: "G-5D0D1NZT41",
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFirebase);

export default appFirebase;
