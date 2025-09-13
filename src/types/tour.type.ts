export interface ITour {
  _id: string;
  title: string;
  slug: string;
  description: string;
  division: string; // division id
  tourType: string; // tour type id
  amenities: string[];
  included: string[];
  excluded: string[];
  images: string[];
  tourPlan: string[];
  startDate: string; // ISO string
  endDate: string; // ISO string
  minAge?: number;
  maxGuest?: number;
  arrivalLocation?: string;
  departureLocation?: string;
  costFrom?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
