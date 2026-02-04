import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCemqQPIQXgY7H0LxuVP4fsZInLMobvqlo",
  authDomain: "karlajungles-portfolio.firebaseapp.com",
  projectId: "karlajungles-portfolio",
  storageBucket: "karlajungles-portfolio.firebasestorage.app",
  messagingSenderId: "117075372060",
  appId: "1:117075372060:web:090530fe2813abfdfc97d9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);