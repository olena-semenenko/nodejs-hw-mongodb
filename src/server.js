import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { env } from './utils/env.js';
import { contactsRouter } from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';

const PORT = Number(env('PORT', '3000'));
export const setupServer = () => {
  const app = express();
  // add cors
  app.use(cors());
  // add pino
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  // parser json
  app.use(
    express.json({
      limit: '1mb',
      type: ['application/json', 'application/vnd.api+json'],
    }),
  );

  //  get contacts & get contacts by id
  app.use(contactsRouter);

  // 404 middleware
  app.use(notFoundHandler);

  // 500 middleware
  app.use(errorHandler);

  //   start server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
  });

  return app;
};
