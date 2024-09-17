import request from 'supertest';
import { env } from '@app/src/config/env';
import { Server } from 'http';
import mongoose from 'mongoose';
import { ExpressApp } from '@app/src/frameworks/server/express/application';

const app = new ExpressApp().getInstance();
let server: Server;
beforeAll(async () => {
  await mongoose.connect(env.MONGO_TEST_URI);
  await mongoose.connection.db?.dropDatabase();
  server = app.listen(env.PORT, () => console.log('listening at %d', env.PORT));
});
afterAll(async () => {
  await mongoose.connection.db?.dropDatabase();
  mongoose.disconnect();
  server.close();
});

const registerUser = (userData: Record<string, any>) => {
  return request(app).post('/api/auth/register').send(userData);
};

describe('Authentication', () => {
  it('It should not create a user with invalid fields', async () => {
    const invalidUsers = [
      { username: 'j', email: 'johndoe@gmail.com', password: 'Password@123' },
      {
        username: 'johndoe69',
        email: 'invalidemail',
        password: 'Password@123',
      },
      { username: 'johndoe69', email: 'johndoe@gmail.com', password: 'short' },
    ];

    for (const user of invalidUsers) {
      const result = await registerUser(user);
      expect(result.statusCode).toBe(400); // Bad Request
    }
  });
  it('It creates a new user', async () => {
    let result = await registerUser({
      username: 'johndoe69',
      email: 'johndoe@gmail.com',
      password: 'Password@123',
    });

    expect(result.statusCode).toBe(201);
  });
  it('It should not create a duplicate user', async () => {
    const duplicateUsers = [
      {
        username: 'johndoe69',
        email: 'djohndoe@gmail.com',
        password: 'dPassword@123',
      },
      {
        username: 'djohndoe69',
        email: 'johndoe@gmail.com',
        password: 'dPassword@123',
      },
      {
        username: 'johndoe69',
        email: 'johndoe@gmail.com',
        password: 'dPassword@123',
      },
    ];
    for (const user of duplicateUsers) {
      const result = await registerUser(user);
      expect(result.statusCode).toBe(409);
    }
  });
});
