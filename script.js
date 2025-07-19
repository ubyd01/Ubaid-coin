import { auth, db } from './firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  ref, set, get, update, child
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const signup = async () => {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const refEmail = new URLSearchParams(window.location.search).get("ref") || "none";

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;
    await set(ref(db, 'users/' + uid), {
      email: email,
      balance: 0,
      referredBy: refEmail
    });

    if (refEmail !== "none") {
      rewardReferrer(refEmail);
    }

    window.location.href = "dashboard.html";
  } catch (error) {
    alert(error.message);
  }
};

const login = async () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
  } catch (error) {
    alert(error.message);
  }
};

const logout = async () => {
  await signOut(auth);
  window.location.href = "login.html";
};

const mineCoin = async () => {
  const user = auth.currentUser;
  if (!user) return;

  const uid = user.uid;
  const userRef = ref(db, 'users/' + uid);
  const snapshot = await get(userRef);

  if (snapshot.exists()) {
    const data = snapshot.val();
    const newBalance = (data.balance || 0) + 1;
    await update(userRef, { balance: newBalance });
    document.getElementById("balance").innerText = newBalance;
  }
};

const rewardReferrer = async (refEmail) => {
  const usersRef = ref(db, 'users');
  const snapshot = await get(usersRef);
  snapshot.forEach(childSnap => {
    const data = childSnap.val();
    if (data.email === refEmail) {
      const refBalance = (data.balance || 0) + 1000;
      update(ref(db, 'users/' + childSnap.key), { balance: refBalance });
    }
  });
};

onAuthStateChanged(auth, async (user) => {
  if (window.location.pathname.endsWith("dashboard.html") && user) {
    document.getElementById("userEmail").innerText = user.email;
    const uid = user.uid;
    const snap = await get(ref(db, 'users/' + uid));
    if (snap.exists()) {
      const data = snap.val();
      document.getElementById("balance").innerText = data.balance;
      document.getElementById("referralLink").value = `${window.location.origin}/signup.html?ref=${user.email}`;
    }
  }
});

// Expose functions globally
window.signup = signup;
window.login = login;
window.logout = logout;
window.mineCoin = mineCoin;
