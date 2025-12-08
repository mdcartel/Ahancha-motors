// app/api/vehicles/route.ts
import { NextRequest, NextResponse } from 'next/server';
// Mark this app route as statically exportable when using `output: "export"`
export const dynamic = "force-static";
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';

// This is a mock database function
// In a real application, you would use a database like MongoDB, PostgreSQL, etc.
async function getVehiclesFromFile() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'vehicles.json');
    const fileData = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    // If file doesn't exist or is invalid, return empty array
    return [];
  }
}

async function saveVehiclesToFile(vehicles: any[]) {
  // By default, writing to the local filesystem is disabled for safety in
  // production environments (many hosts like Vercel have a read-only filesystem).
  // To enable writing during local development you can set the environment
  // variable `ALLOW_FS_WRITE=true`.
  const canWrite = process.env.ALLOW_FS_WRITE === 'true';
  if (!canWrite) {
    console.warn('Disk writes are disabled; set ALLOW_FS_WRITE=true to enable.');
    return false;
  }

  try {
    const filePath = path.join(process.cwd(), 'data', 'vehicles.json');
    // Ensure the directory exists
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(vehicles, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error saving vehicles:', error);
    return false;
  }
}

// GET handler to retrieve all vehicles
export async function GET() {
  const vehicles = await getVehiclesFromFile();
  return NextResponse.json(vehicles);
}

// POST handler to add a new vehicle
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = ['make', 'model', 'year', 'price', 'mileage', 'fuelType', 'transmission', 'exteriorColor'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Field '${field}' is required` },
          { status: 400 }
        );
      }
    }
    
    // Get existing vehicles
    const vehicles = await getVehiclesFromFile();
    
    // Create new vehicle with generated ID
    const newVehicle = {
      id: uuidv4(),
      title: `${data.year} ${data.make} ${data.model} ${data.trim || ''}`.trim(),
      ...data,
      // Default image if none provided
      image: data.image || '/images/cars/car-placeholder.jpg',
      // Add creation timestamp
      createdAt: new Date().toISOString(),
    };
    
    // Add to vehicles array
    vehicles.push(newVehicle);
    
    // Save updated vehicles list (guarded in production)
    const success = await saveVehiclesToFile(vehicles);

    if (success) {
      return NextResponse.json(newVehicle, { status: 201 });
    } else {
      return NextResponse.json(
        { error: 'Failed to save vehicle data; writing to disk is disabled in this environment' },
        { status: 501 }
      );
    }
  } catch (error) {
    console.error('Error adding vehicle:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// DELETE handler to remove a vehicle
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Vehicle ID is required' },
        { status: 400 }
      );
    }
    
    // Get existing vehicles
    const vehicles = await getVehiclesFromFile();
    
    // Filter out the vehicle to delete
    const updatedVehicles = vehicles.filter((vehicle: any) => vehicle.id !== id);
    
    // If no vehicle was removed, return 404
    if (updatedVehicles.length === vehicles.length) {
      return NextResponse.json(
        { error: 'Vehicle not found' },
        { status: 404 }
      );
    }
    
    // Save updated vehicles list (guarded in production)
    const success = await saveVehiclesToFile(updatedVehicles);

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Failed to save vehicle data; writing to disk is disabled in this environment' },
        { status: 501 }
      );
    }
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}