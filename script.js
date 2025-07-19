const db = firebase.database();
const auth = firebase.auth();

function handleSignup(e) {
  e.preventDefault();
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      db.ref("users/" + user.uid).set({
        email: user.email,
        coins: 0,
        referral: email
      });
      window.location.href = "dashboard.html";
    })
    .catch(err => alert(err.message));
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(err => alert(err.message));
}

function logout() {
  auth.signOut().then(() => {
    window.location.href = "index.html";
  });
}

function tapCoin() {
  const user = auth.currentUser;
  if (user) {
    const userRef = db.ref("users/" + user.uid);
    userRef.once("value", snapshot => {
      let current = snapshot.val().coins || 0;
      userRef.update({ coins: current + 1 });
      document.getElementById("coinCount").innerText = current + 1;
    });
  }
}

auth.onAuthStateChanged(user => {
  if (user && document.getElementById("dashboard")) {
    const userRef = db.ref("users/" + user.uid);
    userRef.once("value", snapshot => {
      const data = snapshot.val();
      document.getElementById("username").innerText = user.email;
      document.getElementById("coinCount").innerText = data.coins || 0;
      document.getElementById("referralLink").value = window.location.origin + "/signup.html?ref=" + encodeURIComponent(user.email);
    });
  }
});
