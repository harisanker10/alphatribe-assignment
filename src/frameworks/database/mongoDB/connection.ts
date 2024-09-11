import { env } from '@app/src/config/env';
import mongoose, { ConnectOptions } from 'mongoose';

export function mongoDbConnection() {
  function connectToMongo() {
    return mongoose.connect(env.MONGO_URI).then((connection) => connection);
  }

  function closeConnection() {
    mongoose.disconnect();
  }
  function testClean() {
    mongoose.deleteModel('User');
  }
  mongoose.connection.on('connected', () => {
    console.log('Connected to mongodb');
  });

  // mongoose.connection.on('disconnected', () => {
  //   console.log('Disconnected from mongodb');
  // });
  return {
    connectToMongo,
    closeConnection,
    testClean,
  };
}
