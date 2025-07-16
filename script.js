let tg = window.Telegram.WebApp;
let username = tg.initDataUnsafe.user?.username || "Guest";

// Get referral from URL
const urlParams = new URLSearchParams(window.location.search);
const referrer = urlParams.get("ref");

// Save referrer locally (only once)
if (referrer && referrer !== username && !localStorage.getItem(username + "_referrer")) {
  localStorage.setItem(username + "_referrer", referrer);
}

// Load on page
window.onload = () => {
  document.getElementById('username').innerText = username;
  loadBalance();

  // Set referral link
  document.getElementById("refLink").value = `https://ubaid-coin-webapp.vercel.app?ref=${username}`;
};

// Load balance
function loadBalance() {
  let balance = parseInt(localStorage.getItem(username + "_ubyd") || 0);
  document.getElementById("balance").innerText = balance;
}

// Tap mining logic
function startMining() {
  let balance = parseInt(localStorage.getItem(username + "_ubyd") || 0);
  balance += 1;
  localStorage.setItem(username + "_ubyd", balance);
  document.getElementById("balance").innerText = balance;

  alert("✅ You mined 1 🪙 UBYD!");

  // Referral reward (only on first mine)
  if (balance === 1) {
    const ref = localStorage.getItem(username + "_referrer");
    if (ref && ref !== username) {
      let refBal = parseInt(localStorage.getItem(ref + "_ubyd") || 0);
      refBal += 1000;
      localStorage.setItem(ref + "_ubyd", refBal);
      console.log(`🎉 Referral bonus: +1000 UBYD to ${ref}`);
    }
  }
}

// Copy referral link
function copyReferral() {
  const link = document.getElementById("refLink");
  link.select();
  document.execCommand("copy");
  alert("🔗 Referral link copied!");
    }
