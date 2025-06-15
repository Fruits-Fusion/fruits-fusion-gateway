import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import enviroment from '../config/env.config';

@Module({
  controllers: [ProductsController],
  imports: [
    ClientsModule.register([
      {
        name: enviroment().PRODUCT_MS_KEYNAME,
        transport: Transport.TCP,
        options: {
          host: enviroment().PRODUCT_MS_HOST,
          port: enviroment().PRODUCT_MS_PORT,
        },
      },
    ]),
  ],
})
export class ProductsModule {}
