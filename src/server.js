import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { env } from './utils/env.js';
import rootRouter from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';

const PORT = Number(env('PORT', '3000'));
export const setupServer = () => {
  const app = express();
  app.use(cookieParser());
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

  app.use(rootRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
  });

  return app;
};
