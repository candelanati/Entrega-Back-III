import { createApp } from './app.js';
import { connectDatabase } from './config/db.config.js';
import { env } from './config/env.config.js';

const bootstrap = async () => {
  try {
    await connectDatabase();
    const app = createApp();

    app.listen(env.port, () => {
      console.log(`Servidor escuchando en el puerto ${env.port}`);
    });
  } catch (error) {
    console.error('No se pudo iniciar el servidor:', error.message);
    process.exit(1);
  }
};

bootstrap();
