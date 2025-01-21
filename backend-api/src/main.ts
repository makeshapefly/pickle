import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: 'http://86.148.56.156:8081',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

