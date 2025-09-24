import { ErrorCode } from "../enums/errorCode.enum";

export interface ApiResponse<T> {
  data: T;
  errorCode: ErrorCode;
  message: string;
}
