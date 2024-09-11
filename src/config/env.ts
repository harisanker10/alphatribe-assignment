import { config } from 'dotenv';
config();
export const env = {
  JWT_SECRET: process.env.JWT_SECRET as string,
  PORT: process.env.PORT as string,
  MONGO_URI: process.env.MONGO_URI as string,
  NODE_ENV: process.env.NODE_ENV as string,
  MONGO_TEST_URI: process.env.MONGO_TEST_URI as string,
};
