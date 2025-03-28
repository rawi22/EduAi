import users from './users';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    // Basic validation
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check if user exists
    const user = users.find(user => user.email === email);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // In a real application, this would send a password reset email
    // For this demo, we'll just return success
    return res.status(200).json({ 
      message: 'Password reset link sent to email',
      success: true
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
