import dotenv from 'dotenv';

dotenv.config();

const toNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const env = {
  port: toNumber(process.env.PORT, 8080),
  databaseUrl: process.env.DATABASE || process.env.MONGO_URI || '',
  nodeEnv: process.env.NODE_ENV || 'development',
  dockerHubUrl: process.env.DOCKERHUB_URL || 'https://hub.docker.com/r/andelanati/proyecto-final-adopciones'
};
