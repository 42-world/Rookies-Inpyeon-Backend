import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import 'reflect-metadata';
import { AppModule } from './app.module';
import {
  initAccessLog,
  initCors,
  initSentry,
  initSwagger,
  PHASE,
} from './core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  initAccessLog(app);
  initSentry(app, {
    dsn: configService.get('SENTRY_DSN'),
  });

  initSwagger(app, {
    title: 'Rookies Inpyeon API',
    description: `Rookies Inpyeon API - ${PHASE} environment`,
  });

  initCors(app, {
    originList: configService.get('ORIGIN_LIST'),
    originRegex: configService.get('ORIGIN_REGEX'),
  });

  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // decorator(@)가 없는 속성이 들어오면 해당 속성은 제거하고 받아들입니다.
      forbidNonWhitelisted: true, // DTO에 정의되지 않은 값이 넘어오면 request 자체를 막습니다.
      transform: true,
    }),
  );

  await app.listen(configService.get('PORT') ?? 3000);
}

bootstrap();
