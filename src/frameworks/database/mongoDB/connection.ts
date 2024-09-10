import mongoose, { ConnectOptions } from 'mongoose';

export function mongoDbConnection(mongoUri: string, options?: ConnectOptions) {
  function connectToMongo() {
    return mongoose.connect(mongoUri, options).then((connection) => connection);
  }
  mongoose.connection.on('connected', () => {
    console.log('Connected to mongodb');
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from mongodb');
  });
  return {
    connectToMongo,
  };
}
