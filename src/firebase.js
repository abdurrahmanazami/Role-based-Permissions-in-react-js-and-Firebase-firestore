// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getFunctions } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_PcY2qUXn1p1vVbG9OQtjJpuX4UQVXaI",
  authDomain: "role-permission-firestore.firebaseapp.com",
  projectId: "role-permission-firestore",
  storageBucket: "role-permission-firestore.firebasestorage.app",
  messagingSenderId: "472732542941",
  appId: "1:472732542941:web:4ca45d5981572cae8eb834"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
// export const functions = getFunctions(app);
export const secondaryAuth = getAuth(
  initializeApp(firebaseConfig, "Secondary")
);