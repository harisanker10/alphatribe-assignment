import request from 'supertest';
import express, { Express } from 'express';
import { configureExpress } from '@app/src/frameworks/server/express/express';
import { errorHandler } from '@app/src/frameworks/server/express/middlewares/errorHandlerMiddleware';
import { env } from '@app/src/config/env';
import { Server } from 'http';
import mongoose from 'mongoose';

const app = express();
let server: Server;
beforeAll(async () => {
  await mongoose.connect(env.MONGO_TEST_URI);
  await mongoose.connection.db?.dropDatabase();
  configureExpress(app);
  app.use(errorHandler);
  server = app.listen(env.PORT, () => console.log('listening at %d', env.PORT));
});
afterAll(async () => {
  server.close();
  mongoose.disconnect();
});

const registerUser = async (userData: Record<string, any>) => {
  return await request(app).post('/api/auth/register').send(userData);
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
    let result = await request(app).post('/api/auth/register').send({
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
