import { HttpStatus } from "@nestjs/common";

export interface ResponseDto<T = null> {
  status: HttpStatus;
  data: T;
}