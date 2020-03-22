import { ExceptionFilter as BaseExceptionFilter } from "@nestjs/common";

export interface ExceptionFilter<T extends Error> extends BaseExceptionFilter {
  getError(exception: T, url: string): Promise<ErrorResponse> | ErrorResponse;
}

export enum ErrorStatus {
  /** Indicates database errors resulted by query failing, conficts .. etc */
  DATABASE_ERROR = "db500",
  /** Indicates app errors, unsafe properties accessing, unhandled rejections .. etc */
  INTERNAL_SERVER_ERROR = "500",
  /** Indicates unauthorized errors resulted by lack of token, invalid token .. etc */
  UNAUTHORIZED_ERROR = "usr403",
}

export interface ErrorResponse {
  /** Specifies the error code */
  code: ErrorStatus;
  /** Specifies the error name */
  name: string;
  /** Specifies the date on whcih the error occured*/
  timestamp: DateTime;
  /** Specifies the error message*/
  message: string;
  /** Specifies the logger message*/
  devMessage?: string;
  /** Specifies the called route*/
  url: string;
}
