import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

type Options = {
  title: string;
  description: string;
  path?: string;
  version?: string;
};

export function initSwagger(app: INestApplication, options: Options) {
  const config = new DocumentBuilder()
    .setTitle(options.title)
    .setDescription(options.description)
    .setVersion(options.version ?? '0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(options.path ?? 'docs', app, document, {
    customSiteTitle: options.title,
    customCss: '.swagger-ui .topbar { display: none }',
  });
}
