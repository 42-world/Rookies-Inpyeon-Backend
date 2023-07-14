import { INestApplication } from '@nestjs/common';
import is from '@sindresorhus/is';

type Options = {
  /**
   * @example 'http://localhost:3000'
   * @example 'http://localhost:3000,http://localhost:3001'
   * @example ['http://localhost:3000', 'http://localhost:3001']
   */
  originList?: string[] | string;

  /**
   * @example 'https://pr-\d*\.dmscco3fqszec\.amplifyapp\.com'
   */
  originRegex?: string;
};

export function initCors(app: INestApplication, options: Options) {
  const origin: (string | RegExp)[] = [];

  if (!options.originList && !options.originRegex) {
    console.warn(
      'CORS: originList or originRegex is not defined. CORS will be disabled.',
    );

    return;
  }

  if (options.originList && is.string(options.originList)) {
    origin.push(...options.originList.split(',').map((item) => item.trim()));
  }

  if (options.originList && is.array(options.originList)) {
    origin.push(...options.originList);
  }

  if (options.originRegex) {
    origin.push(new RegExp(options.originRegex));
  }

  app.enableCors({
    origin,
    credentials: true,
  });
}
