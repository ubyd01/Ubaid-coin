import { db } from './firebase.js';
import {
  doc, getDoc, setDoc, updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let tg = window.Telegram.WebApp;
tg.ready();

let username = "Guest";
try {
  username = tg.initDataUnsafe?.user?.username || "Guest";
} catch (e) {
  console.warn("Telegram init failed:", e);
}

window.onload = async () => {
  document.getElementById("username").innerText = username;

  // Set referral link
  const refInput = document.getElementById("refLink");
  refInput.value = `https://ubyd-webapp.vercel.app?ref=${username}`;

  // Save referrer only once
  const urlParams = new URLSearchParams(window.location.search);
  const referrer = urlParams.get("ref");
  if (referrer && referrer !== username && !localStorage.getItem(username + "_referrer")) {
    localStorage.setItem(username + "_referrer", referrer);
  }

  await loadBalance();
  await loadWallet();
};

async function loadBalance() {
  const userRef = doc(db, "users", username);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    const data = userDoc.data();
    document.getElementById("balance").innerText = data.balance || 0;
  } else {
    await setDoc(userRef, { balance: 0 });
    document.getElementById("balance").innerText = 0;
  }
}

window.startMining = async () => {
  const userRef = doc(db, "users", username);
  const userDoc = await getDoc(userRef);
  let bal = 0;
  if (userDoc.exists()) {
    bal = userDoc.data().balance || 0;
  }

  bal += 1;
  await updateDoc(userRef, { balance: bal });
  document.getElementById("balance").innerText = bal;
  alert("✅ You mined 1 🪙 UBYD!");

  // First time reward
  if (bal === 1) {
    const ref = localStorage.getItem(username + "_referrer");
    if (ref && ref !== username) {
      const refRef = doc(db, "users", ref);
      const refDoc = await getDoc(refRef);
      let refBal = 0;
      if (refDoc.exists()) refBal = refDoc.data().balance || 0;
      refBal += 1000;
      await updateDoc(refRef, { balance: refBal });
      console.log(`🎁 +1000 UBYD given to referrer @${ref}`);
    }
  }
};

window.copyReferral = () => {
  const input = document.getElementById("refLink");
  input.select();
  document.execCommand("copy");
  alert("🔗 Referral link copied!");
};

window.connectWallet = async () => {
  if (!window.ethereum) {
    alert("❌ MetaMask or Wallet not found.");
    return;
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    document.getElementById("walletAddress").innerText = address;

    // Save to Firebase
    const userRef = doc(db, "users", username);
    await updateDoc(userRef, { wallet: address });

    alert("✅ Wallet connected and saved!");
  } catch (err) {
    console.error(err);
    alert("⚠️ Wallet connection failed");
  }
};
