
export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  transmission: 'Automatic' | 'Manual';
  bodyType: 'Sedan' | 'SUV' | 'Coupe' | 'Hatchback' | 'Truck';
  image: string;
  description: string;
  features: string[];
  rating: number;
}

export interface FilterState {
  search: string;
  make: string;
  minPrice: number;
  maxPrice: number;
  bodyType: string[];
  fuelType: string[];
}

export interface AIInsight {
  summary: string;
  pros: string[];
  cons: string[];
  marketVerdict: string;
}
