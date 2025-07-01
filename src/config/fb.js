// config/fb.js (o donde tengas tu configuración de Firebase)
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import Constants from "expo-constants";

// Configuración directa (recomendado paras)
const firebaseConfig = {
  apiKey: "AIzaSyAbmB39xaosD2G3zrVBtnOmX70HZ3nlpDA",
  authDomain: "inventary-74f46.firebaseapp.com",
  projectId: "inventary-74f46",
  storageBucket: "inventary-74f46.firebasestorage.app",
  messagingSenderId: "262404945117",
  appId: "1:262404945117:web:f71e0e1fa0ae65007d9734"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);