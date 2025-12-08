// src/app/api/vehicles/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
// Mark this app route as statically exportable when using `output: "export"`
export const dynamic = "force-static";
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
    
    try {
      const fileData = await fs.readFile(filePath, 'utf8');
      return JSON.parse(fileData);
    } catch (error) {
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
    return [];
  }
}

// Use the exact type signature that Next.js requires
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Explicitly use a try/catch for accessing the id
    let id: string;
    try {
      // Try to access it as a promise first (dev mode)
      const resolvedParams = await Promise.resolve(params);
      id = resolvedParams.id;
    } catch {
      // If that fails, try direct access (prod mode)
      id = params.id;
    }
    
    if (!id) {
      return NextResponse.json(
        { error: 'Vehicle ID is required' },
        { status: 400 }
      );
    }
    
    // Get all vehicles
    const vehicles = await getVehiclesFromFile();
    
    // Find the vehicle with the matching ID
    const vehicle = vehicles.find((v: Vehicle) => v.id === id);
    
    if (!vehicle) {
      return NextResponse.json(
        { error: 'Vehicle not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(vehicle);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get vehicle details' },
      { status: 500 }
    );
  }
}