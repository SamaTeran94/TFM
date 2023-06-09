
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDQfNbQLSO2ZXckGVpoCJXXzP-TkbLL3Ic",
    authDomain: "tfm-unir-fb71e.firebaseapp.com",
    projectId: "tfm-unir-fb71e",
    storageBucket: "tfm-unir-fb71e.appspot.com",
    messagingSenderId: "585638380379",
    appId: "1:585638380379:web:f3febf97504f2f9341907e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();