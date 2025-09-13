import type { ComponentType } from "react";

export type { ISendOTP } from "./auth.type";
export type { ILogin } from "./auth.type";
export type { IVerifyOTP } from "./auth.type";

export type { ITour } from "./tour.type";

export interface IResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export type TRole = "SUPERADMIN" | "ADMIN" | "USER";
