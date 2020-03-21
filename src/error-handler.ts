import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";

import { Response, Request } from "express";
import { QueryFailedError } from "typeorm";
import { ErrorStatus } from "error-status.enum";

interface ErrorResponse {
  code: ErrorStatus;
  statusCode: number;
  name: string;
  timestamp: string | Date;
  message: string;
  url: string;
}

@Catch(QueryFailedError)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const error = this.getError(exception, request.url);

    response.status(500).send(error);
  }

  getError(exception: QueryFailedError, url: string): ErrorResponse {
    const timestamp: string = new Date().toISOString();
    const code = ErrorStatus.DATABASE_ERROR;
    const statusCode = 500;
    const { message, name } = exception;

    const error: ErrorResponse = {
      url,
      statusCode,
      code,
      timestamp,
      name,
      message,
    };
    return error;
  }
}
