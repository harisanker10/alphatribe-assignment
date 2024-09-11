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

const createPost = async (postData: Record<string, any>) => {
  return await request(app).post('/api/posts').send(postData);
};

describe('Post Creation', () => {
  it('It should not create a new post', async () => {
    const post = {};
    const result = await createPost(post);
    expect(result.statusCode).toBe(201); // Bad Request
  });
});
