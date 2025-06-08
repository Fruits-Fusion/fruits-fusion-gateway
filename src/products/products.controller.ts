import {
  Controller,
  Delete,
  Patch,
  Post,
  Get,
  Param,
  Inject,
  Query,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../common';
import { catchError } from 'rxjs';
import enviroment from '../config/configuration';

@Controller('v1/products')
export class ProductsController {
  constructor(
    @Inject(enviroment().PRODUCT_MS_KEYNAME)
    private readonly productServiceProxy: ClientProxy,
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productServiceProxy.send('createProduct', createProductDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productServiceProxy.send('findAllProducts', paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productServiceProxy.send('findOneProduct', { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productServiceProxy
      .send('updateProduct', { id, ...updateProductDto })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productServiceProxy.send('removeProduct', id).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
