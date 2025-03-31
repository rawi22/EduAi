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
    console.error('Login error:', error);
    let errorMessage = 'Login failed';
    
    if (error.code === 'auth/wrong-password') {
      errorMessage = 'Invalid password';
    } else if (error.code === 'auth/user-not-found') {
      errorMessage = 'User not found';
    }

    return res.status(401).json({ message: errorMessage });
  }
}
