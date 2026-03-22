import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "josees-finest.firebaseapp.com",
  projectId: "josees-finest",
  storageBucket: "josees-finest.firebasestorage.app",
  messagingSenderId: "1023918542701",
  appId: "1:1023918542701:web:XXXX",
  measurementId: "G-XXXX"
};

const app = initializeApp(firebaseConfig);

console.log("Firebase Connected");