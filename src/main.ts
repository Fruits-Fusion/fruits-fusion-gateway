import { NestFactory } from '@nestjs/core';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { RpcExceptionMS } from './common';
import enviroment from './config/configuration';

function configureGlobalPipes(app: INestApplication) {
  app.setGlobalPrefix('/api');
  app.useGlobalFilters(new RpcExceptionMS());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
}

(async function main() {
  const logger = new Logger('Client-gateway');

  const app = await NestFactory.create(AppModule);
  configureGlobalPipes(app);

  await app.listen(enviroment().CLIENT_GT_PORT);

  logger.log(
    `${enviroment().CLIENT_GT_NAME} running on port ${enviroment().CLIENT_GT_PORT}`,
  );
})();
