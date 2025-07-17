// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, get, update } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDfpuC5SkmpeSQBGZIl8BkzVKPfGzMQLfo",
  authDomain: "ubaid-coin-web.firebaseapp.com",
  projectId: "ubaid-coin-web",
  storageBucket: "ubaid-coin-web.firebasestorage.app",
  messagingSenderId: "176984179390",
  appId: "1:176984179390:web:9876ec51afbadcef9854ef"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set, get, update };
