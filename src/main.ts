import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { LogLevel, ValidationPipe } from '@nestjs/common';

import { RootModule } from './root.module';

async function bootstrap() {
  const logger = process.env.NESTJS_LOGGER_LEVELS.split(',') as LogLevel[];
  const app = await NestFactory.create(RootModule, { logger });
  const config = app.get(ConfigService);
  const serverPort = config.get<number>('SERVER_PORT');
  const serverInterface = config.get<string>('SERVER_INTERFACE');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(serverPort, serverInterface);
}
bootstrap();
