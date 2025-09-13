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
  startDate: string; 
  endDate: string;   
  createdAt: string;  
  updatedAt: string;  
  __v: number;
}
