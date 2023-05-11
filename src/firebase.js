import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyDdUuiNT3eGDrq2fzrRyP8egFW-OS_y8Z4",
  authDomain: "blog-post-5b69c.firebaseapp.com",
  projectId: "blog-post-5b69c",
  storageBucket: "blog-post-5b69c.appspot.com",
  messagingSenderId: "504440373088",
  appId: "1:504440373088:web:252a8dab16325f51b0a805",
  measurementId: "G-4BXHMXH9XZ"
}

const app = initializeApp(config);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};