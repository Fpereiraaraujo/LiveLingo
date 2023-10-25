import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";




// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDG__aPwWoJXenIca1fXXwVhBb_bFX98dk",
    authDomain: "saas-translator-app-c6d21.firebaseapp.com",
    projectId: "saas-translator-app-c6d21",
    storageBucket: "saas-translator-app-c6d21.appspot.com",
    messagingSenderId: "272126020159",
    appId: "1:272126020159:web:2b253f284e00bae348068a"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);


export { db, auth, functions }



