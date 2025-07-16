import { db } from './firebase.js';
import { doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let tg = window.Telegram.WebApp;
tg.ready();

let username = "Guest";
try {
  username = tg.initDataUnsafe?.user?.username || "Guest";
} catch (e) {
  console.warn("Telegram init error:", e);
}

window.onload = async () => {
  document.getElementById("username").innerText = username;

  // Set referral link
  document.getElementById("refLink").value = `https://ubyd-webapp.vercel.app?ref=${username}`;

  // Save referrer only once
  const urlParams = new URLSearchParams(window.location.search);
  const referrer = urlParams.get("ref");
  if (referrer && referrer !== username) {
    const existing = localStorage.getItem(username + "_referrer");
    if (!existing) localStorage.setItem(username + "_referrer", referrer);
  }

  await loadBalance();
};

// Load balance from Firebase
async function loadBalance() {
  const userRef = doc(db, "users", username);
  const docSnap = await getDoc(userRef);
  let balance = 0;

  if (docSnap.exists()) {
    balance = docSnap.data().balance || 0;
  } else {
    await setDoc(userRef, { balance: 0 });
  }

  document.getElementById("balance").innerText = balance;
}

// Tap to mine
window.startMining = async () => {
  const userRef = doc(db, "users", username);
  const docSnap = await getDoc(userRef);
  let balance = docSnap.exists() ? docSnap.data().balance || 0 : 0;

  balance += 1;
  await setDoc(userRef, { balance });

  document.getElementById("balance").innerText = balance;
  alert("✅ You mined 1 🪙 UBYD");

  if (balance === 1) {
    const ref = localStorage.getItem(username + "_referrer");
    if (ref && ref !== username) {
      const refRef = doc(db, "users", ref);
      const refSnap = await getDoc(refRef);
      let refBal = refSnap.exists() ? refSnap.data().balance || 0 : 0;

      refBal += 1000;
      await setDoc(refRef, { balance: refBal });
      console.log(`🎉 +1000 UBYD to ${ref}`);
    }
  }
};

// Copy referral
window.copyReferral = () => {
  const input = document.getElementById("refLink");
  input.select();
  document.execCommand("copy");
  alert("🔗 Referral link copied!");
};
