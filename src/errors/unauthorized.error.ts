import { Request, Response } from "express";
import { QueryFailedError } from "typeorm";
import { DateObject, getMessage } from "utils";

import { ArgumentsHost, Catch, UnauthorizedException } from "@nestjs/common";

import { ErrorResponse, ErrorStatus, ExceptionFilter } from "./error.types";

@Catch(UnauthorizedException)
export class UnAuthorizedExceptionFilter
  implements ExceptionFilter<UnauthorizedException> {
  catch(exception: QueryFailedError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const error = this.getError(exception, request.url);

    response.status(403).send(error);
  }

  getError(exception: QueryFailedError, url: string): ErrorResponse {
    const date: DateObject = new DateObject();
    const timestamp: DateTime = date.getISOString();
    const code: ErrorStatus = ErrorStatus.UNAUTHORIZED_ERROR;
    const { name } = exception;
    const message: string = getMessage("errors.auth.unauthorized");

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
