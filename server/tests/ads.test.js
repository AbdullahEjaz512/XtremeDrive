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

async function createUserAndToken(email) {
  const res = await request(app)
    .post('/api/auth/signup')
    .send({
      email,
      password: 'SecurePass123!',
      name: 'Test User'
    });

  return { token: res.body.token, user: res.body.user };
}

test('create ad requires authentication', async () => {
  const res = await request(app)
    .post('/api/ads')
    .send({
      title: 'Test Car',
      make: 'Toyota',
      model: 'Corolla',
      city: 'Lahore',
      price: 5000000,
      condition: 'Used',
      description: 'Good condition'
    });

  expect(res.status).toBe(401);
  expect(res.body.error).toBe('Access token required');
});

test('pagination validation rejects invalid values', async () => {
  const res = await request(app).get('/api/ads?page=0&limit=999');

  expect(res.status).toBe(400);
  expect(res.body.errors).toContain('Page must be a positive number');
  expect(res.body.errors).toContain('Limit must be between 1 and 100');
});

test('user cannot update another user\'s ad', async () => {
  const userA = await createUserAndToken('owner@example.com');
  const userB = await createUserAndToken('attacker@example.com');

  const createRes = await request(app)
    .post('/api/ads')
    .set('Authorization', `Bearer ${userA.token}`)
    .send({
      title: 'Owner Car',
      make: 'Honda',
      model: 'Civic',
      city: 'Lahore',
      price: 4500000,
      condition: 'Used',
      description: 'Owned by user A'
    });

  const adId = createRes.body.ad.id;

  const updateRes = await request(app)
    .put(`/api/ads/${adId}`)
    .set('Authorization', `Bearer ${userB.token}`)
    .send({
      price: 1000000
    });

  expect(updateRes.status).toBe(403);
  expect(updateRes.body.error).toBe('Unauthorized: You can only edit your own ads');
});
