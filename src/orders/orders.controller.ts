import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import enviroment from '../config/configuration';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { PaginationDto } from 'src/common';
import { catchError } from 'rxjs';

@Controller('v1/orders')
export class OrdersController {
  constructor(
    @Inject(enviroment().ORDER_MS_KEYNAME)
    private readonly orderServiceProxy: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderServiceProxy.send('createOrder', createOrderDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.orderServiceProxy.send('findAllOrders', paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderServiceProxy.send('findOneOrder', { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Patch(':id')
  updateOrderStatus(@Param('id', ParseIntPipe) id: number) {
    return this.orderServiceProxy.send('updateOrderStatus', { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
