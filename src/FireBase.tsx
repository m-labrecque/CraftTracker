// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOJI3TbLFwDm3gMB1MP_5I58vkhhRmuuQ",
  authDomain: "crafttracker-45e5c.firebaseapp.com",
  projectId: "crafttracker-45e5c",
  storageBucket: "crafttracker-45e5c.appspot.com",
  messagingSenderId: "992001125216",
  appId: "1:992001125216:web:be4c07cdf8aa2304cccc05",
  measurementId: "G-0ECDWT6T3J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);