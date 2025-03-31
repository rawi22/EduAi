import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import { setDoc, doc, getFirestore } from 'firebase/firestore';

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
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(`[Register API] Firebase Auth user created successfully. UID: ${user.uid}`);

    // Create user document in Firestore
    console.log(`[Register API] Attempting Firestore document creation for UID: ${user.uid}`);
    const db = getFirestore(); // Ensure Firestore is initialized correctly
    if (!db) {
        console.error("[Register API] Firestore instance (db) is not initialized!");
        throw new Error("Firestore not initialized");
    }
    await setDoc(doc(db, 'users', user.uid), {
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
