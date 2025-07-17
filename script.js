// script.js
import { db, ref, set, get, update } from './firebase.js';

let tg = window.Telegram.WebApp;
let user = tg.initDataUnsafe?.user || null;
let userId = user ? user.id : 'guest_' + Math.random().toString(36).substring(2, 10);
let balance = 0;
let refParam = new URLSearchParams(window.location.search).get("ref");

// Set username
document.getElementById("username").textContent = user ? user.username : "Guest";

// Fetch or create user balance
const balanceRef = ref(db, 'users/' + userId);
get(balanceRef).then(snapshot => {
  if (snapshot.exists()) {
    balance = snapshot.val().balance || 0;
  } else {
    set(balanceRef, { balance: 0, referrals: 0 });
    if (refParam && refParam !== userId) {
      const refUser = ref(db, 'users/' + refParam);
      get(refUser).then(refSnap => {
        if (refSnap.exists()) {
          let currentRef = refSnap.val().balance || 0;
          update(refUser, { balance: currentRef + 1000 });
        }
      });
    }
  }
  document.getElementById("balance").textContent = balance;
});

// Tap to Mine
document.getElementById("mineBtn").addEventListener("click", () => {
  balance += 1;
  document.getElementById("balance").textContent = balance;
  update(balanceRef, { balance });
});

// Referral Link
const link = `${window.location.origin}${window.location.pathname}?ref=${userId}`;
document.getElementById("refLink").value = link;

window.copyReferral = () => {
  navigator.clipboard.writeText(link).then(() => {
    alert("Referral link copied!");
  });
};

// Connect Wallet (placeholder logic)
window.connectWallet = () => {
  if (typeof window.ethereum !== 'undefined') {
    window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
      document.getElementById("walletStatus").textContent = `Wallet: ${accounts[0]}`;
    }).catch(err => {
      alert("Wallet connection failed.");
    });
  } else {
    alert("No wallet found. Install MetaMask or Trust Wallet.");
  }
};
