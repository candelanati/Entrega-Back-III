import mongoose from 'mongoose';
import { env } from './env.config.js';

export const connectDatabase = async (databaseUrl = env.databaseUrl) => {
  if (!databaseUrl) {
    throw new Error('La variable de entorno DATABASE o MONGO_URI es obligatoria');
  }

  await mongoose.connect(databaseUrl);
  return mongoose.connection;
};

export const disconnectDatabase = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
};
