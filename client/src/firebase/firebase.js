import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDpjq6okrgCZ_lC2HZmfwGmTqXfShlh4ns",
  authDomain: "interview-meet-17c98.firebaseapp.com",
  projectId: "interview-meet-17c98",
  storageBucket: "interview-meet-17c98.appspot.com",
  messagingSenderId: "578555585866",
  appId: "1:578555585866:web:021766846a63782dc30db3"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);