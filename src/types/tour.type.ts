export interface ITour {
  _id: string;
  title: string;
  slug: string;
  description: string;
  division: { _id: string; name: string };
  tourType: string; // tour type id
  amenities: string[];
  included: string[];
  excluded: string[];
  images: string[];
  tourPlan: string[];
  startDate: string; // ISO string
  endDate: string; // ISO string
  minAge?: number;
  maxGuest: number;
  arrivalLocation?: string;
  departureLocation?: string;
  costFrom: number;
  location?: string;
  createdAt: string;
  updatedAt: string;
}
