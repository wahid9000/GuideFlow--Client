export interface ISendOTP {
  email: string;
}
export interface IVerifyOTP {
  email: string;
  otp: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IUpdateUser {
  name?: string;
  phone?: string;
  address?: string;
  picture?: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  picture?: string;
  address?: string;
  role: string;
  isActive?: string;
  isVerified?: boolean;
}
