import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, set, get, update, child } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
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

window.saveUserData = (username, balance, referrer) => {
  set(ref(db, 'users/' + username), {
    balance: balance,
    referrer: referrer || null
  });
};

window.getUserData = async (username) => {
  const snapshot = await get(child(ref(db), `users/${username}`));
  return snapshot.exists() ? snapshot.val() : null;
};
