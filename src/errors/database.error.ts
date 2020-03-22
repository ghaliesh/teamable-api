import { Request, Response } from "express";
import { QueryFailedError } from "typeorm";
import { DateObject, getMessage } from "utils";

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
    const date: DateObject = new DateObject();
    const timestamp: DateTime = date.getISOString();
    const code: ErrorStatus = ErrorStatus.DATABASE_ERROR;
    const { message: devMessage, name } = exception;
    const message: string = getMessage("errors.general.default");

    const error: ErrorResponse = {
      url,
      code,
      timestamp,
      name,
      message,
      devMessage,
    };
    return error;
  }
}
