import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyDmcsbLk3iQ9aFRgPXWQBqyIgnuvcGt9Vo",
  authDomain: "howareyoutoday-fcb8c.firebaseapp.com",
  projectId: "howareyoutoday-fcb8c",
  storageBucket: "howareyoutoday-fcb8c.appspot.com",
  messagingSenderId: "386825384877",
  appId: "1:386825384877:web:ee132b10d9e4652330e724",
  measurementId: "G-36S480MPJV",
};
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("googleLogin").addEventListener("click", (event) => {
    event.preventDefault();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  });

  const signInButton = document.getElementById("signInButton");
  if (signInButton) {
    signInButton.addEventListener("click", (event) => {
      event.preventDefault();
      const signInEmail = document.getElementById("signInEmail").value;
      const signInPassword = document.getElementById("signInPassword").value;
      signInWithEmailAndPassword(auth, signInEmail, signInPassword)
        .then((userCredential) => {
          const user = userCredential.user;
          sessionStorage.setItem("user", JSON.stringify(user));
          window.location.href = "/index.html";
        })
        .catch((error) => {
          console.log("로그인 실패");
          const errorCode = error.code;
          const errorMessage = error.message;
          const errorElement = document.getElementById("signInError");
          errorElement.textContent =
            "로그인에 실패했습니다. 다시 입력해주세요.";
        });
    });
  }
});
