import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = 400;
    let message = exception.message;

    if (exception['response']?.message[0]) {
      message = exception['response']?.message[0];
    }

    response  
      .status(status)
      .json({
        message,
      });
  }
}