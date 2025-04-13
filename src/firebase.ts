// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBaMUknRD5gjIARqnv1y4vlUcJ7VUsaEVY",
  authDomain: "cycle-project-2c901.firebaseapp.com",
  databaseURL: "https://cycle-project-2c901-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cycle-project-2c901",
  storageBucket: "cycle-project-2c901.firebasestorage.app",
  messagingSenderId: "412076864932",
  appId: "1:412076864932:web:80ace46f50a2d2f6163d31",
  measurementId: "G-7RCTEVFG5P"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
