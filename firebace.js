// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDk3438v0le9QNgSWF_IZmbRM0Xagy9Wtk",
  authDomain: "ubaid-coin-79045.firebaseapp.com",
  databaseURL: "https://ubaid-coin-79045-default-rtdb.firebaseio.com",
  projectId: "ubaid-coin-79045",
  storageBucket: "ubaid-coin-79045.firebasestorage.app",
  messagingSenderId: "324999835323",
  appId: "1:324999835323:web:7303c36b2c955cd411839e",
  measurementId: "G-6623RCKWE0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
