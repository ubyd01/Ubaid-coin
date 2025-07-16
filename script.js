function getAllUsers() {
  let keys = Object.keys(localStorage).filter(k => k.endsWith("_ubyd"));
  return keys.map(k => {
    return {
      username: k.replace("_ubyd", ""),
      balance: parseInt(localStorage.getItem(k))
    };
  }).sort((a, b) => b.balance - a.balance);
}

if (document.getElementById("leaderboardList")) {
  let users = getAllUsers();
  let ul = document.getElementById("leaderboardList");
  users.forEach((u, i) => {
    let li = document.createElement("li");
    li.textContent = `#${i + 1} - ${u.username}: ${u.balance} UBYD`;
    ul.appendChild(li);
  });
    }
