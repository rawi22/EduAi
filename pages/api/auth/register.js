// Import necessary Firebase functions directly
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
// We might still use the shared db instance later if needed, or initialize it locally too.
// import { db } from '../../../lib/firebase';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
// --- Add this diagnostic log ---
console.log(`[Register API] Checking Environment Variable - NEXT_PUBLIC_FIREBASE_PROJECT_ID: ${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`);
// --- End diagnostic log ---
console.log("[Register API] Received request"); // Log entry point
  console.log("[Register API] Received request"); // Log entry point
  try {
    const { email, password, confirmPassword } = req.body;
    console.log("[Register API] Request body:", { email: email ? '***' : 'MISSING', password: password ? '***' : 'MISSING', confirmPassword: confirmPassword ? '***' : 'MISSING' }); // Log received data (mask passwords)

    // Validate input
    if (!email || !password || !confirmPassword) {
      console.log("[Register API] Validation failed: Missing fields");
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      console.log("[Register API] Validation failed: Passwords do not match");
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (password.length < 6) {
      console.log("[Register API] Validation failed: Password too short");
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    console.log(`[Register API] Input validated for email: ${email}. Attempting Firebase user creation...`);
    
    // --- Re-initialize Auth locally for this request ---
    console.log("[Register API] Attempting LOCAL Firebase Auth initialization...");
    const localFirebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID
    };
    // Log the config being used locally
    console.log("[Register API] Local Config for Auth:", {
        apiKey: localFirebaseConfig.apiKey ? '***' : 'MISSING',
        authDomain: localFirebaseConfig.authDomain,
        projectId: localFirebaseConfig.projectId
        // Add others if needed for debug
    });

    // Ensure required local config is present
    if (!localFirebaseConfig.apiKey || !localFirebaseConfig.authDomain || !localFirebaseConfig.projectId) {
        console.error("[Register API] CRITICAL: Local config check failed!");
        throw new Error("Local Firebase config missing");
    }

    // Initialize a temporary app instance ONLY if none exists (standard check)
    // Note: This might still pick up the global app if lib/firebase ran first in the same container instance.
    // A truly isolated test might need a unique app name, but let's try this first.
    const localApp = !getApps().length ? initializeApp(localFirebaseConfig) : getApp();
    const localAuth = getAuth(localApp); // Get auth from the potentially local app instance
    console.log("[Register API] Local Auth instance obtained.");
    // --- End Local Auth Initialization ---

    // Create user in Firebase Auth using the LOCAL auth instance
    const userCredential = await createUserWithEmailAndPassword(localAuth, email, password);
    const user = userCredential.user;
    console.log(`[Register API] Firebase Auth user created successfully using LOCAL auth. UID: ${user.uid}`);

    // Create user document in Firestore
    console.log(`[Register API] Attempting Firestore document creation for UID: ${user.uid}`);
    // --- Initialize Firestore locally too for consistency ---
    console.log("[Register API] Getting LOCAL Firestore instance...");
    const localDb = getFirestore(localApp); // Get Firestore from the same app instance used for auth
    if (!localDb) {
        console.error("[Register API] CRITICAL: Failed to get LOCAL Firestore instance!");
        throw new Error("Local Firestore initialization failed");
    }
    console.log("[Register API] Local Firestore instance obtained.");
    // --- End Local Firestore Initialization ---
    await setDoc(doc(localDb, 'users', user.uid), { // Use localDb
      email: user.email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      onboardingComplete: false
    });
    console.log(`[Register API] Firestore document created successfully for UID: ${user.uid}`);

    console.log("[Register API] Registration successful. Sending 201 response.");
    return res.status(201).json({
      message: 'Registration successful',
      user: {
        uid: user.uid,
        email: user.email
      }
    });

  } catch (error) {
    // Log the full error details
    console.error('[Register API] Error during registration:', error);
    console.error(`[Register API] Error Code: ${error.code}, Message: ${error.message}`);

    let errorMessage = 'Registration failed';
    let statusCode = 500; // Default to internal server error

    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'Email already in use';
      statusCode = 400; // Bad request (user error)
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email format';
      statusCode = 400; // Bad request (user error)
    } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak.';
        statusCode = 400; // Bad request (user error)
    } else {
        // Handle other Firebase errors or unexpected errors
        errorMessage = 'An unexpected error occurred during registration.';
        statusCode = 500; // Internal server error
    }

    return res.status(statusCode).json({ message: errorMessage });
  }
}
