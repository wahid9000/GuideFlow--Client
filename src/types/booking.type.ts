import type { ITour } from "./tour.type";

export interface IBooking {
  _id: string;
  user: string; // user id
  tour: ITour; // populated
  payment?: IPayment; // populated
  guestCount: number;
  status: "PENDING" | "CANCEL" | "COMPLETE" | "FAILED";
  createdAt: string;
  updatedAt: string;
}

interface IPayment {
  _id: string;
  transactionId: string;
  amount: number;
  status: string;
  // other fields
}
