import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; //obtengo la base de datos

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_APIKEY,
    authDomain: process.env.EXPO_PUBLIC_AUTHDOMAIN,
    projectId: process.env.EXPO_PUBLIC_PROJECTID,
    storageBucket: process.env.EXPO_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.EXPO_PUBLIC_APPID
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); //exporto la base de datos