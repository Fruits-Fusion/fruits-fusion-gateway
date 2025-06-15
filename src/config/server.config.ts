import { INestApplication, ValidationPipe } from '@nestjs/common';
import { RpcExceptionMS } from '../common';

export function configureGlobalPipes(app: INestApplication) {
  app.setGlobalPrefix('/api');
  app.useGlobalFilters(new RpcExceptionMS());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
}
