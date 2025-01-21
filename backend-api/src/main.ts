import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://86.148.56.156:8081', 'http://86.148.56.156', '*'],
    credentials: true,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: [
      'Accept',
      'Content-Type',
      'Authorization',
    ]
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

