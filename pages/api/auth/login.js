import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import { setDoc, doc, getDoc, getFirestore } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Authenticate user
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get additional user data from Firestore
    const db = getFirestore();
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (!userDoc.exists()) {
      return res.status(404).json({ message: 'User data not found' });
    }

    const userData = userDoc.data();

    // Return user data (excluding sensitive info)
    const { password: _, ...safeUserData } = userData;
    
    return res.status(200).json({
      message: 'Login successful',
      user: safeUserData,
      session: {
        uid: user.uid,
        email: user.email,
        token: await user.getIdToken()
      }
    });

  } catch (error) {
    console.error('[Login API] Error during login:', error); // Log the specific error
    let errorMessage = 'Login failed';
    let statusCode = 500; // Default to internal server error

     // Check specific Firebase auth error codes
    if (error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/invalid-credential' || // More general invalid credential error
        error.code === 'auth/invalid-email') { // Catch invalid email format on login too
      errorMessage = 'Invalid email or password';
      statusCode = 401; // Use 401 for auth errors
      console.log(`[Login API] Authentication failed: ${error.code}`);
    } else if (error.message === "Firestore not initialized") {
        // Handle specific internal error
        errorMessage = 'Server configuration error.';
        statusCode = 500; // Use 500 for server issues
        console.log("[Login API] Firestore initialization error detected.");
    } else {
       // Generic error for other issues (e.g., network, unexpected Firebase errors)
       errorMessage = 'An unexpected error occurred during login.';
       statusCode = 500; // Use 500 for unknown server errors
       console.log("[Login API] Unknown error during login.");
    }
    
    return res.status(statusCode).json({ message: errorMessage });
  }
}
