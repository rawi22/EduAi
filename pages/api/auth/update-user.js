import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { auth } from '../../../lib/firebase';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { userId, userData } = req.body;

    // Validate input
    if (!userId || !userData) {
      return res.status(400).json({ message: 'User ID and user data are required' });
    }

    const requiredFields = ['firstName', 'lastName', 'age', 'grade', 'city', 'school'];
    const missingFields = requiredFields.filter(field => !userData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        missingFields
      });
    }

    // Update user in Firestore
    const db = getFirestore();
    await updateDoc(doc(db, 'users', userId), {
      ...userData,
      updatedAt: new Date().toISOString(),
      onboardingComplete: true
    });

    // Get updated user data
    const updatedUser = {
      ...userData,
      id: userId,
      updatedAt: new Date().toISOString()
    };

    // Return updated user without sensitive fields
    const { password, ...safeUserData } = updatedUser;
    return res.status(200).json({ 
      message: 'User updated successfully',
      user: safeUserData
    });

  } catch (error) {
    console.error('Update user error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
