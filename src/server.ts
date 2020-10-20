import express from 'express';
import cors from 'cors';
import compression from 'compression';
import { createServer } from 'http';

import environments from './config/environments';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
import expressPlayground from 'graphql-playground-middleware-express';
import Database from './lib/database';
import { isContext } from 'vm';
import { IContext } from './interfaces/context.interface';
//Configuracion de las variables de entorno (lectura)
if (process.env.NODE_ENV !== 'production') {
  const env = environments;
  console.log(env);
}

const init = async () => {
  const app = express();
  app.use('*', cors());
  app.use(compression());

  const database = new Database();
  const db = await database.init()
  const context =  async({req, connection}: IContext) => {
    const token = req ? req.headers.authorization : connection.authorization;
    return {db, token};
  }

  const server = new ApolloServer({
    schema,
    introspection: true,
    context,
  })

  server.applyMiddleware({app})

  app.get('/', expressPlayground({
    endpoint: '/graphql'
  }));

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
