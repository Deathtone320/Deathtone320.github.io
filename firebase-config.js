// firebase-config.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDioEFelEannZdfrp_MgZAFRuqhs6m3bJc",
  authDomain: "deathforge-games-website.firebaseapp.com",
  projectId: "deathforge-games-website",
  storageBucket: "deathforge-games-website.appspot.com",
  messagingSenderId: "323425449417",
  appId: "1:323425449417:web:e121c53dd39a984bc0a418",
  measurementId: "G-8PH2XL7SJ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
