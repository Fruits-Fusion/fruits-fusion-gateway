import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import enviroment from '../config/configuration';

@Module({
  controllers: [OrdersController],
  imports: [
    ClientsModule.register([
      {
        name: enviroment().ORDER_MS_KEYNAME,
        transport: Transport.TCP,
        options: {
          host: enviroment().ORDER_MS_HOST,
          port: enviroment().ORDER_MS_PORT,
        },
      },
    ]),
  ],
})
export class OrdersModule {}
