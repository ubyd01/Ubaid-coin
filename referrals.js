let tg = window.Telegram.WebApp;
let username = tg.initDataUnsafe.user?.username || "Guest";

// Get referrer from URL
const urlParams = new URLSearchParams(window.location.search);
const referrer = urlParams.get("ref");

// On first visit, save referrer (only if it's not you)
if (referrer && referrer !== username) {
  if (!localStorage.getItem(username + "_referrer")) {
    localStorage.setItem(username + "_referrer", referrer);
  }
}

// Show username
window.onload = () => {
  document.getElementById('username')?.innerText = username;
  document.getElementById('userInfo')?.innerText = `Hello @${username}`;
  loadBalance();
};

// Load balance from localStorage
function loadBalance() {
  let balance = localStorage.getItem(username + "_ubyd") || 0;
  document.getElementById("balance")?.innerText = balance;
}

// Add 1 coin per tap
function startMining() {
  let current = parseInt(localStorage.getItem(username + "_ubyd") || 0);
  let newBal = current + 1;
  localStorage.setItem(username + "_ubyd", newBal);
  document.getElementById("balance")?.innerText = newBal;
  alert("You mined 1 🪙 UBYD");

  // First time mining reward to referrer
  if (newBal === 1) {
    let ref = localStorage.getItem(username + "_referrer");
    if (ref && ref !== username) {
      let refBal = parseInt(localStorage.getItem(ref + "_ubyd") || 0);
      let updatedRefBal = refBal + 1000;
      localStorage.setItem(ref + "_ubyd", updatedRefBal);
      console.log(`Referral bonus: Gave +1000 UBYD to ${ref}`);
    }
  }
}
