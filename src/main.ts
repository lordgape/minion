import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import * as helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';

const PORT: any = process.env.PORT || 8000;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.use(helmet());
  app.useGlobalInterceptors(new TransformInterceptor());

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () => Logger.log(`Minion server is up and listening on port ${PORT}`, 'Main'));
}
bootstrap();
