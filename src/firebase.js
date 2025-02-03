// Importation des fonctions nécessaires depuis Firebase SDK
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Configuration de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDaHgyYN745lM6mfoFhff8rO6F6Zpwc5Dg",
  authDomain: "moviesapp-ed2ba.firebaseapp.com",
  projectId: "moviesapp-ed2ba",
  storageBucket: "moviesapp-ed2ba.appspot.com",
  messagingSenderId: "1065544903044",
  appId: "1:1065544903044:web:de934525e517cfe4e515d1",
  measurementId: "G-T9L0MBC2M1"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Initialisation des services Firestore et Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
