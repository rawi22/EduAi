import bcrypt from 'bcryptjs';

// Simple in-memory user database
// In a production environment, this would be replaced with a real database
let users = [];

// Initialize with a test user with hashed password
if (users.length === 0) {
  const hashedPassword = bcrypt.hashSync('password123', 10);
  
  users.push({
    id: 1,
    email: 'test@example.com',
    password: hashedPassword,
    firstName: 'Test',
    lastName: 'User',
    age: '15',
    grade: '10',
    city: 'Tel Aviv',
    school: 'Tel Aviv High School',
    books: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
}

// User schema validation
function validateUser(user) {
  const requiredFields = ['email', 'password', 'firstName', 'lastName'];
  const missingFields = requiredFields.filter(field => !user[field]);
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }

  if (!/^\S+@\S+\.\S+$/.test(user.email)) {
    throw new Error('Invalid email format');
  }

  if (typeof user.age !== 'string' || isNaN(user.age) || user.age < 10 || user.age > 18) {
    throw new Error('Age must be between 10 and 18');
  }
}

export default users;
