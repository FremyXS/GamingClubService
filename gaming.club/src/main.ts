import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions = {
    exposedHeaders: ['X-Total-Count', 'Content-Range'],
  };
  app.enableCors(corsOptions);
  const config = new DocumentBuilder()
    .setTitle('GAMING CLUB API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8000);
}
bootstrap();
