import express from 'express';
import { configureExpress } from './frameworks/server/express/express';
import { startServer } from './frameworks/server/startServer';
import { env } from './config/env';
import { createServer } from 'http';
import { mongoDbConnection } from './frameworks/database/mongoDB/connection';
export const app = express();
import { config } from 'dotenv';
config();
console.log({ node_env: process.env.NODE_ENV, port: process.env.PORT });

const bootstrap = async () => {
  await mongoDbConnection(env.MONGO_URI).connectToMongo();
  configureExpress(app);
  const server = createServer(app);
  startServer(server, parseInt(env.PORT));
};

bootstrap();
