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
    const fileData = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error('Error reading vehicles file:', error);
    return [];
  }
}

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = context;
  
  try {
    const vehicleId = params.id;
    
    if (!vehicleId) {
      return NextResponse.json(
        { error: 'Vehicle ID is required' },
        { status: 400 }
      );
    }
    
    // Get all vehicles
    const vehicles = await getVehiclesFromFile();
    
    // Find the vehicle with the matching ID
    const vehicle = vehicles.find((v: { id: string; }) => v.id === vehicleId);
    
    if (!vehicle) {
      return NextResponse.json(
        { error: 'Vehicle not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(vehicle);
  } catch (error) {
    console.error('Error getting vehicle:', error);
    return NextResponse.json(
      { error: 'Failed to get vehicle details' },
      { status: 500 }
    );
  }
}