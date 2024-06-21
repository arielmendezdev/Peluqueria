import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDAm2dKgCpdla0F17cclVbvT4gAqHPI1cw",
  authDomain: "peluqueria-d742a.firebaseapp.com",
  projectId: "peluqueria-d742a",
  storageBucket: "peluqueria-d742a.appspot.com",
  messagingSenderId: "757989764179",
  appId: "1:757989764179:web:67539efe199c9501516aa6",
  measurementId: "G-5D0D1NZT41",
};

const appFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFirebase);

export default appFirebase;

