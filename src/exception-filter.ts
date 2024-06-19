import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log('@@@@@ exception  @@@@@', exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';
    let data = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
      data = exception.getResponse();
    }

    response.status(status).json({
      error: true,
      data,
      message,
    });
  }
}
