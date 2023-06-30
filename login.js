// Import the functions you need from the SDKs you need
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase

const firebaseConfig = {
  apiKey: "AIzaSyDmcsbLk3iQ9aFRgPXWQBqyIgnuvcGt9Vo",
  authDomain: "howareyoutoday-fcb8c.firebaseapp.com",
  projectId: "howareyoutoday-fcb8c",
  storageBucket: "howareyoutoday-fcb8c.appspot.com",
  messagingSenderId: "386825384877",
  appId: "1:386825384877:web:ee132b10d9e4652330e724",
  measurementId: "G-36S480MPJV",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();

document.getElementById("googleLogin").addEventListener("click", (event) => {
  event.preventDefault();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
});

const user = auth.currentUser;
if (user !== null) {
  const displayName = user.displayName;
  const userEmail = user.email;
  const photoURL = user.photoURL;
  const emailVerified = user.emailVerified;
  const uid = user.uid;
}

document.getElementById("signUpButton").addEventListener("click", (event) => {
  event.preventDefault(); //새로고침 방지
  const signUpEmail = document.getElementById("signUpEmail").value;
  const signUpPassword = document.getElementById("signUpPassword").value;

  createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
    .then((userCredential) => {
      console.log(userCredential);
      // Signed up
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
});

document.getElementById("signInButton").addEventListener("click", (event) => {
  event.preventDefault();
  const signInEmail = document.getElementById("signInEmail").value;
  const signInPassword = document.getElementById("signInPassword").value;
  signInWithEmailAndPassword(auth, signInEmail, signInPassword)
    .then((userCredential) => {
      console.log(userCredential);
      // Signed in
      const user = userCredential.user;
      sessionStorage.setItem("user", JSON.stringify(user));
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.log("로그인 실패");
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});
