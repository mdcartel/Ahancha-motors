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
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Vehicle ID is required' },
        { status: 400 }
      );
    }
    
    // Get all vehicles
    const vehicles = await getVehiclesFromFile();
    
    // Find the vehicle with the matching ID
    const vehicle = vehicles.find((v: { id: string; }) => v.id === id);
    
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

// PATCH endpoint to update a vehicle
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Vehicle ID is required' },
        { status: 400 }
      );
    }
    
    // Get the update data from the request
    const updates = await request.json();
    
    // Get all vehicles
    const vehicles = await getVehiclesFromFile();
    
    // Find the index of the vehicle to update
    const vehicleIndex = vehicles.findIndex((v: { id: string; }) => v.id === id);
    
    if (vehicleIndex === -1) {
      return NextResponse.json(
        { error: 'Vehicle not found' },
        { status: 404 }
      );
    }
    
    // Update the vehicle
    const updatedVehicle = {
      ...vehicles[vehicleIndex],
      ...updates,
      // Ensure the ID remains the same
      id,
    };
    
    // Replace the vehicle in the array
    vehicles[vehicleIndex] = updatedVehicle;
    
    // Save the updated vehicles array back to the file
    const filePath = path.join(process.cwd(), 'data', 'vehicles.json');
    await fs.writeFile(filePath, JSON.stringify(vehicles, null, 2), 'utf8');
    
    return NextResponse.json(updatedVehicle);
  } catch (error) {
    console.error('Error updating vehicle:', error);
    return NextResponse.json(
      { error: 'Failed to update vehicle' },
      { status: 500 }
    );
  }
}

// DELETE endpoint to remove a vehicle
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Vehicle ID is required' },
        { status: 400 }
      );
    }
    
    // Get all vehicles
    const vehicles = await getVehiclesFromFile();
    
    // Filter out the vehicle to delete
    const updatedVehicles: Vehicle[] = vehicles.filter((v: Vehicle) => v.id !== id);
    
    // If no vehicle was removed, return 404
    if (updatedVehicles.length === vehicles.length) {
      return NextResponse.json(
        { error: 'Vehicle not found' },
        { status: 404 }
      );
    }
    
    // Save the updated vehicles array back to the file
    const filePath = path.join(process.cwd(), 'data', 'vehicles.json');
    await fs.writeFile(filePath, JSON.stringify(updatedVehicles, null, 2), 'utf8');
    
    return NextResponse.json({ success: true, message: 'Vehicle deleted successfully' });
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    return NextResponse.json(
      { error: 'Failed to delete vehicle' },
      { status: 500 }
    );
  }
}