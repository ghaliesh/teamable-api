import { Request, Response } from "express";
import { QueryFailedError } from "typeorm";
import { getNow } from "utils";

import { ArgumentsHost, Catch } from "@nestjs/common";

import { ErrorResponse, ErrorStatus, ExceptionFilter } from "./error.types";

@Catch(QueryFailedError)
export class DataBaseExceptionFilter
  implements ExceptionFilter<QueryFailedError> {
  catch(exception: QueryFailedError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const error = this.getError(exception, request.url);

    response.status(500).send(error);
  }

  getError(exception: QueryFailedError, url: string): ErrorResponse {
    const timestamp: DateTime = getNow({ format: "string" });
    const code: ErrorStatus = ErrorStatus.DATABASE_ERROR;
    const { message, name } = exception;

    const error: ErrorResponse = {
      url,
      code,
      timestamp,
      name,
      message,
    };
    return error;
  }
}
