// Simple in-memory user database
// In a production environment, this would be replaced with a real database
let users = [];

// Initialize with a test user
if (users.length === 0) {
  users.push({
    id: 1,
    email: 'test@example.com',
    password: 'password123', // In production, this would be hashed
    firstName: 'Test',
    lastName: 'User',
    age: '15',
    grade: '10',
    city: 'Tel Aviv',
    school: 'Tel Aviv High School',
    books: [],
    createdAt: new Date().toISOString()
  });
}

export default users;
