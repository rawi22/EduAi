import users from './users';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { userId } = req.query;

    // If userId is provided, return specific user
    if (userId) {
      const user = users.find(user => user.id === parseInt(userId));
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      return res.status(200).json({ user: userWithoutPassword });
    }

    // Otherwise return all users (without passwords)
    const usersWithoutPasswords = users.map(user => {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    return res.status(200).json({ users: usersWithoutPasswords });
  } catch (error) {
    console.error('Get user error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
