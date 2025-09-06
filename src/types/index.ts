export type { ISendOTP } from "./auth.type";
export type { ILogin } from "./auth.type";

export interface IResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}
