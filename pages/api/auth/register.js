import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import { setDoc, doc, getFirestore } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password, confirmPassword } = req.body;

    // Validate input
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create user document in Firestore
    const db = getFirestore();
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      onboardingComplete: false
    });

    return res.status(201).json({ 
      message: 'Registration successful',
      user: {
        uid: user.uid,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    let errorMessage = 'Registration failed';
    
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'Email already in use';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email format';
    }

    return res.status(400).json({ message: errorMessage });
  }
}
