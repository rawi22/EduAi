const request = require('supertest');
const app = require('../pages/api/auth/_base');
const { admin } = require('../lib/firebase');

// Test data
const TEST_USER = {
  email: `test${Date.now()}@example.com`,
  password: 'secure123',
  confirmPassword: 'secure123'
};

describe('Authentication API', () => {
  let testUserId;
  let authToken;

  afterAll(async () => {
    // Cleanup test user
    if (testUserId) {
      await admin.auth().deleteUser(testUserId);
      await admin.firestore().collection('users').doc(testUserId).delete();
    }
  });

  // Positive test cases
  test('Register new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(TEST_USER)
      .expect(201);
    
    expect(res.body.user.email).toBe(TEST_USER.email);
    testUserId = res.body.user.uid;
  });

  test('Login with new credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: TEST_USER.email,
        password: TEST_USER.password
      })
      .expect(200);
    
    expect(res.body.user.email).toBe(TEST_USER.email);
    authToken = res.body.session.token;
  });

  test('Update user profile', async () => {
    const updateData = {
      userId: testUserId,
      userData: {
        firstName: 'Test',
        lastName: 'User',
        age: '15',
        grade: '10',
        city: 'Test City',
        school: 'Test School'
      }
    };

    const res = await request(app)
      .put('/api/auth/update-user')
      .set('Authorization', `Bearer ${authToken}`)
      .send(updateData)
      .expect(200);
    
    expect(res.body.user.firstName).toBe('Test');
  });

  test('Get user data', async () => {
    const res = await request(app)
      .get(`/api/auth/user?email=${TEST_USER.email}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
    
    expect(res.body.user.email).toBe(TEST_USER.email);
  });

  // Negative test cases
  test('Fail registration with existing email', async () => {
    await request(app)
      .post('/api/auth/register')
      .send(TEST_USER)
      .expect(400);
  });

  test('Fail registration with mismatched passwords', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({
        ...TEST_USER,
        confirmPassword: 'mismatched'
      })
      .expect(400);
  });

  test('Fail login with wrong password', async () => {
    await request(app)
      .post('/api/auth/login')
      .send({
        email: TEST_USER.email,
        password: 'wrongpassword'
      })
      .expect(401);
  });

  test('Fail update without auth token', async () => {
    await request(app)
      .put('/api/auth/update-user')
      .send({
        userId: testUserId,
        userData: { firstName: 'ShouldFail' }
      })
      .expect(401);
  });

  test('Fail get user with invalid email', async () => {
    await request(app)
      .get('/api/auth/user?email=invalid')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(404);
  });
});