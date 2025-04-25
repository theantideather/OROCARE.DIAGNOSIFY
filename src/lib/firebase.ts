import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { FIREBASE_CONFIG } from '../services/firebase/config';

// Initialize Firebase
const app = initializeApp(FIREBASE_CONFIG);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);