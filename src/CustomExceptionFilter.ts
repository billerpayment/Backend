import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Response } from 'express';
  
  @Catch()
  export class CustomExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const status = this.getStatus(exception);
  
      const errorResponse = this.getErrorResponse(exception, status);
  
      response.status(status).json(errorResponse);
    }
  
    private getStatus(exception: any): number {
      if (exception instanceof HttpException) {
        return exception.getStatus();
      }
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  
    private getErrorResponse(exception: any, status: number): any {
      const message = this.getErrorMessage(exception, status);
  
      return {
        error: true,
        statusCode: status,
        message,
        data: null,
      };
    }
  
    private getErrorMessage(exception: any, status: number): string {
      if (status === HttpStatus.BAD_REQUEST) {
        return 'Bad Request perform, check the request data and try again.';
      } else if (status === HttpStatus.UNAUTHORIZED) {
        return 'No authorization to perform the request!';
      } else if (status === HttpStatus.FORBIDDEN) {
        return 'The request performed is forbidden!';
      } else if (status === HttpStatus.NOT_FOUND) {
        return 'Unable to find record, please check the data and try again.';
      } else if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
        return 'A network server error occurred, please try again later.';
      } else if (status === HttpStatus.SERVICE_UNAVAILABLE) {
        return 'Service unavailable, please try again later.';
      } else if (status === HttpStatus.GATEWAY_TIMEOUT) {
        return 'Request timeout, please try again.';
      }
      // Add more custom error messages for other status codes if needed
      return 'An unexpected error occurred, please try again later.';
    }
  }
  