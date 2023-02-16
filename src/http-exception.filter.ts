import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // const status = exception.getStatus();
    const timestamp = new Date()
      .toLocaleString('en-us', {
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      .split(', ');
    let date = timestamp[0];
    let time = timestamp[1];
    date = `${date.split('/')[2]}-${date.split('/')[0]}-${date.split('/')[1]}`;
    time = `${time.split(':')[0] === '24' ? '00' : time.split(':')[0]}:${
      time.split(':')[1]
    }:${time.split(':')[2]}`;

    response.status(500).send({
      // statusCode: status,
      timestamp: `${date} ${time}`,
      endpoint: request.url,
      ip: request.ip,
      method: request.method,
      error: exception.toString(),
    });
  }
}
