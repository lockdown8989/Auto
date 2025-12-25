
import React from 'react';
import { Vehicle } from './types';

export const VEHICLES: Vehicle[] = [
  {
    id: '1',
    make: 'Tesla',
    model: 'Model 3 Performance',
    year: 2023,
    price: 42990,
    mileage: 5000,
    fuelType: 'Electric',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1200',
    description: 'The Tesla Model 3 is designed for electric-powered performance, with dual motor AWD, quick acceleration, long range and fast charging.',
    features: ['Autopilot', 'Panoramic Roof', 'Premium Audio', 'Heated Seats'],
    rating: 4.8
  },
  {
    id: '2',
    make: 'BMW',
    model: 'M4 Competition',
    year: 2022,
    price: 78500,
    mileage: 12000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'Coupe',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=1200',
    description: 'A benchmark luxury coupe that combines aggressive performance, comfort, and cutting-edge technology.',
    features: ['Leather Interior', 'Apple CarPlay', 'Surround View Camera', 'Adaptive Cruise'],
    rating: 4.6
  },
  {
    id: '3',
    make: 'Porsche',
    model: '911 GT3',
    year: 2024,
    price: 182000,
    mileage: 850,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'Coupe',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200',
    description: 'The quintessential sports car. Timeless design, unparalleled driving dynamics, and a legacy of racing excellence.',
    features: ['Sport Chrono Package', 'Bose Sound', 'PASM', 'Heated Steering Wheel'],
    rating: 4.9
  },
  {
    id: '4',
    make: 'Mercedes-Benz',
    model: 'S63 E Performance AMG',
    year: 2025,
    price: 185000,
    mileage: 15,
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200',
    description: 'The pinnacle of luxury performance. The 2025 S63 combines a twin-turbo V8 with high-performance hybrid technology for unrivaled power and comfort.',
    features: ['Night Vision', 'Rear-Axle Steering', 'Burmester 4D Sound', 'AMG Ride Control+'],
    rating: 4.9
  },
  {
    id: '5',
    make: 'Audi',
    model: 'RS e-tron GT',
    year: 2024,
    price: 147000,
    mileage: 50,
    fuelType: 'Electric',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=1200',
    description: 'Sculpted by the wind, powered by progress. The RS e-tron GT is Audi’s electric masterpiece.',
    features: ['Quattro AWD', 'Matrix LED Headlights', 'B&O Sound', 'Carbon Fiber Trim'],
    rating: 4.8
  },
  {
    id: '6',
    make: 'Ford',
    model: 'F-150 Raptor R',
    year: 2023,
    price: 109000,
    mileage: 3400,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'Truck',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1200',
    description: 'The absolute pinnacle of desert-racing capability and raw truck performance.',
    features: ['Supercharged V8', 'Fox Live Valve Shocks', '37-inch Tires', 'Recaro Seats'],
    rating: 4.9
  }
];

export const MAKES = ['Tesla', 'BMW', 'Porsche', 'Rivian', 'Audi', 'Ford', 'Toyota', 'Mercedes-Benz'];
export const BODY_TYPES = ['Sedan', 'SUV', 'Coupe', 'Hatchback', 'Truck'];
export const FUEL_TYPES = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
