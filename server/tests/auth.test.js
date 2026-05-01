import request from 'supertest';
import { createApp } from '../app.js';

let app;
let prisma;

beforeAll(async () => {
  const setup = await createApp({ seed: false });
  app = setup.app;
  prisma = setup.prisma;
});

afterAll(async () => {
  if (prisma) {
    await prisma.$disconnect();
  }
});

beforeEach(async () => {
  await prisma.ad.deleteMany();
  await prisma.user.deleteMany();
});

test('signup creates a user and returns token', async () => {
  const res = await request(app)
    .post('/api/auth/signup')
    .send({
      email: 'user1@example.com',
      password: 'SecurePass123!',
      name: 'John Doe',
      phone: '1234567890',
      city: 'Lahore'
    });

  expect(res.status).toBe(201);
  expect(res.body.token).toBeTruthy();
  expect(res.body.user).toMatchObject({
    email: 'user1@example.com',
    name: 'John Doe',
    city: 'Lahore'
  });
});

test('login fails with wrong password', async () => {
  await request(app)
    .post('/api/auth/signup')
    .send({
      email: 'user2@example.com',
      password: 'SecurePass123!',
      name: 'Jane Doe'
    });

  const res = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'user2@example.com',
      password: 'WrongPassword'
    });

  expect(res.status).toBe(401);
  expect(res.body.error).toBe('Invalid credentials');
});

test('login succeeds with correct credentials', async () => {
  await request(app)
    .post('/api/auth/signup')
    .send({
      email: 'user3@example.com',
      password: 'SecurePass123!',
      name: 'Sam Doe'
    });

  const res = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'user3@example.com',
      password: 'SecurePass123!'
    });

  expect(res.status).toBe(200);
  expect(res.body.token).toBeTruthy();
  expect(res.body.user.email).toBe('user3@example.com');
});
