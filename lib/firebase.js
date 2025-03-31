import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// Construct Firebase config from environment variables (Server-side ONLY)
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID // Optional
};

// --- Add detailed logging of the config object ---
console.log("[firebase.js] Constructed Firebase Config:", {
    apiKey: firebaseConfig.apiKey ? '***' : 'MISSING/UNDEFINED', // Mask API key
    authDomain: firebaseConfig.authDomain,
    projectId: firebaseConfig.projectId,
    storageBucket: firebaseConfig.storageBucket,
    messagingSenderId: firebaseConfig.messagingSenderId,
    appId: firebaseConfig.appId,
    measurementId: firebaseConfig.measurementId
});
// --- End detailed logging ---


// Validate that essential config values are present
if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
  console.error("[firebase.js] CRITICAL: Essential Firebase configuration values (apiKey, authDomain, projectId) are missing or undefined in the environment!");
  // Log exactly which ones are missing
  if (!firebaseConfig.apiKey) console.error("[firebase.js] Missing: apiKey");
  if (!firebaseConfig.authDomain) console.error("[firebase.js] Missing: authDomain");
  if (!firebaseConfig.projectId) console.error("[firebase.js] Missing: projectId");
  // We will still attempt init, Firebase will likely throw a specific error
  // For now, we'll log and attempt init, which will likely fail informatively
} else {
    console.log("Firebase config loaded from environment variables.");
}


// Initialize Firebase
// Check if Firebase app is already initialized to prevent errors during hot-reloading
import { getApps, getApp } from 'firebase/app';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app);

// Firestore collections
const usersCollection = 'users';

export { db, auth, usersCollection };