import express from 'express';
import cors from 'cors';
import compression from 'compression';
import { createServer } from 'http';

import environments from './config/environments';
//Configuracion de las variables de entorno (lectura)
if (process.env.NODE_ENV !== 'production') {
  const env = environments;
  console.log(env);
}

const init = async () => {
  const app = express();
  app.use('*', cors());
  app.use(compression());

  app.get('/', (req, res) => {
    res.send('PROBANDO xd');
  });

  const httpServer = createServer(app);
  const PORT = process.env.PORT || 4000;
  httpServer.listen(
    {
      port: PORT,
    },
    () => console.log(`Servidor levantado en http://localhost:${PORT}`)
  );
};

init();
