// src/app/api/vehicles/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Define the Vehicle type
interface Vehicle {
  id: string;
  [key: string]: any;
}

// Get vehicles from the JSON file
async function getVehiclesFromFile() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'vehicles.json');
    console.log(`Reading vehicles data from: ${filePath}`);
    
    try {
      const fileData = await fs.readFile(filePath, 'utf8');
      return JSON.parse(fileData);
    } catch (error) {
      console.error('Error reading vehicles file:', error);
      // Return a sample array if the file doesn't exist
      return [
        {
          "id": "sample-1",
          "title": "2023 BMW X5 xDrive40i",
          "make": "BMW",
          "model": "X5",
          "trim": "xDrive40i",
          "year": 2023,
          "price": 62999,
          "mileage": 12500,
          "fuelType": "Gasoline",
          "transmission": "Automatic",
          "exteriorColor": "Alpine White",
          "bodyType": "SUV",
          "condition": "Certified Pre-Owned",
          "image": "/images/cars/car-placeholder.jpg",
          "featured": true
        }
      ];
    }
  } catch (error) {
    console.error('Error in getVehiclesFromFile:', error);
    return [];
  }
}

// Define the correct type for context
type RouteContext = {
  params: {
    id: string;
  };
};

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    console.log('GET /api/vehicles/[id] handler called');
    
    // Handle params safely to work in both environments
    const paramsObj = context.params;
    const id = typeof paramsObj === 'object' && paramsObj !== null 
      ? paramsObj.id 
      : (await context.params).id;
      
    console.log(`Looking for vehicle with ID: ${id}`);
    
    if (!id) {
      return NextResponse.json(
        { error: 'Vehicle ID is required' },
        { status: 400 }
      );
    }
    
    // Get all vehicles
    const vehicles = await getVehiclesFromFile();
    console.log(`Found ${vehicles.length} vehicles in database`);
    
    // Find the vehicle with the matching ID
    const vehicle = vehicles.find((v: Vehicle) => v.id === id);
    
    if (!vehicle) {
      console.log(`Vehicle with ID ${id} not found`);
      return NextResponse.json(
        { error: 'Vehicle not found' },
        { status: 404 }
      );
    }
    
    console.log(`Found vehicle: ${vehicle.title}`);
    return NextResponse.json(vehicle);
  } catch (error) {
    console.error('Error getting vehicle:', error);
    return NextResponse.json(
      { error: 'Failed to get vehicle details' },
      { status: 500 }
    );
  }
}