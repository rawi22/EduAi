import users from './users';

export default function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { userId, userData } = req.body;

    // Basic validation
    if (!userId || !userData) {
      return res.status(400).json({ message: 'User ID and user data are required' });
    }

    // Find user by ID
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user data (preserving password and email)
    const updatedUser = {
      ...users[userIndex],
      ...userData,
      // Preserve original email and password
      email: users[userIndex].email,
      password: users[userIndex].password
    };

    // Update user in the database
    users[userIndex] = updatedUser;

    // Return updated user without password
    const { password: _, ...userWithoutPassword } = updatedUser;
    return res.status(200).json({ 
      message: 'User updated successfully',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Update user error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
