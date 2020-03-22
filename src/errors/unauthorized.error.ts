import { Request, Response } from "express";
import { DateObject, getMessage } from "utils";

import { ArgumentsHost, Catch, UnauthorizedException } from "@nestjs/common";

import { ErrorResponse, ErrorStatus, ExceptionFilter } from "./error.types";

@Catch(UnauthorizedException)
export class UnAuthorizedExceptionFilter
  implements ExceptionFilter<UnauthorizedException> {
  catch(exception: UnauthorizedException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const error = this.getError(exception, request.url);

    response.status(403).send(error);
  }

  getError(exception: UnauthorizedException, url: string): ErrorResponse {
    const date: DateObject = new DateObject();
    const timestamp: DateTime = date.getISOString();
    const code: ErrorStatus = ErrorStatus.UNAUTHORIZED_ERROR;
    const message: string = getMessage("errors.auth.unauthorized");
    const { message: devMessage, name } = exception;

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
