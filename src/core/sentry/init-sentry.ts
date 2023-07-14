import { INestApplication } from '@nestjs/common';
import { init } from '@sentry/node';
import { SentryInterceptor } from './sentry.interceptor';

type Options = {
  dsn?: string;
};

export function initSentry(app: INestApplication, options: Options) {
  if (!options.dsn) {
    console.warn("Sentry dsn is not defined. Sentry won't be initialized.");

    return;
  }

  init({ dsn: options.dsn });

  app.useGlobalInterceptors(new SentryInterceptor());
}
