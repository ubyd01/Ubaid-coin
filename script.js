let tg = window.Telegram.WebApp;
let username = tg.initDataUnsafe.user?.username || "Guest";

// Show username
window.onload = () => {
  document.getElementById('username')?.innerText = username;
  document.getElementById('userInfo')?.innerText = `Hello @${username}`;
  loadBalance();
};

// Load balance from localStorage or Firebase
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
                                     }
