import { INestApplication } from '@nestjs/common';
import * as morgan from 'morgan';
import { stream } from './stream';

export function initAccessLog(app: INestApplication) {
  morgan.token('body', (req) => JSON.stringify(req.body));

  app.use(
    morgan(
      ':method :url :status :response-time ms - :res[content-length] :body',
      { stream: stream },
    ),
  );
}
