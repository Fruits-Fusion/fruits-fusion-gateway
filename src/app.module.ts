import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { OrdersController } from './orders/orders.controller';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [ProductsModule, OrdersModule],
  controllers: [OrdersController],
})
export class AppModule {}
