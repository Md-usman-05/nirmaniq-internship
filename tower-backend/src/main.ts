import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Add this line to allow frontend requests
  app.enableCors(); 

  await app.listen(3000);
}
bootstrap();