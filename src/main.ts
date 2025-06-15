import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { configureGlobalPipes } from './config/server.config';
import enviroment from './config/env.config';

(async function main() {
  const logger = new Logger('client-gateway');
  const app = await NestFactory.create(AppModule);
  configureGlobalPipes(app);
  await app.listen(enviroment().CLIENT_GT_PORT);
  logger.log(
    `${enviroment().CLIENT_GT_NAME} running on port ${enviroment().CLIENT_GT_PORT}`,
  );
})();
