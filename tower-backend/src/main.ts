import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); 
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,             // Strips away unauthorized properties
      forbidNonWhitelisted: true,  // Rejects requests with extra properties
      transform: true,             // Converts JSON to DTO instances
    }),
  );
  await app.listen(3000);
}
bootstrap();