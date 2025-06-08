import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcExceptionMS implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const error = exception.getError() as any;

    const status =
      typeof error === 'object' &&
      error.status &&
      typeof error.status === 'number'
        ? error.status
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = typeof error === 'object' ? error.message : error;

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}
