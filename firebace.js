// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDAH3i3trH1W21xhyJqMgXObZil3PDjlmU",
  authDomain: "ubyd-webapp.firebaseapp.com",
  projectId: "ubyd-webapp",
  storageBucket: "ubyd-webapp.firebasestorage.app",
  messagingSenderId: "432754390488",
  appId: "1:432754390488:web:e3cf6e8e094e0877462ead"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
