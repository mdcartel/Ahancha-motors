import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

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

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const make = searchParams.get('make');
    const model = searchParams.get('model');
    const bodyType = searchParams.get('bodyType');
    const excludeId = searchParams.get('exclude');
    const limit = parseInt(searchParams.get('limit') || '3', 10);
    
    // Get all vehicles
    const allVehicles = await getVehiclesFromFile();
    
    // Filter out the current vehicle and find similar ones
    interface Vehicle {
        id: string;
        make: string;
        model: string;
        bodyType: string;
        [key: string]: any; // Additional properties
    }

    let similarVehicles: Vehicle[] = allVehicles.filter((vehicle: Vehicle) => {
        // Exclude the current vehicle
        if (excludeId && vehicle.id === excludeId) {
            return false;
        }
        
        // Match criteria (prioritize same make, then model, then body type)
        return (
            (make && vehicle.make.toLowerCase() === make.toLowerCase()) || 
            (model && vehicle.model.toLowerCase() === model.toLowerCase()) || 
            (bodyType && vehicle.bodyType.toLowerCase() === bodyType.toLowerCase())
        );
    });
    
    // Sort by similarity score (vehicles matching more criteria come first)
    similarVehicles.sort((a, b) => {
      const scoreA = [
        make && a.make.toLowerCase() === make.toLowerCase() ? 3 : 0,
        model && a.model.toLowerCase() === model.toLowerCase() ? 2 : 0,
        bodyType && a.bodyType.toLowerCase() === bodyType.toLowerCase() ? 1 : 0
      ].reduce((sum, val) => sum + val, 0);
      
      const scoreB = [
        make && b.make.toLowerCase() === make.toLowerCase() ? 3 : 0,
        model && b.model.toLowerCase() === model.toLowerCase() ? 2 : 0,
        bodyType && b.bodyType.toLowerCase() === bodyType.toLowerCase() ? 1 : 0
      ].reduce((sum, val) => sum + val, 0);
      
      return scoreB - scoreA;
    });
    
    // Limit the number of results
    similarVehicles = similarVehicles.slice(0, limit);
    
    // If no similar vehicles found, just return some other vehicles
    if (similarVehicles.length === 0) {
      similarVehicles = allVehicles
        .filter((vehicle: Vehicle) => vehicle.id !== excludeId)
        .slice(0, limit);
    }
    
    // Return the similar vehicles
    return NextResponse.json(similarVehicles);
  } catch (error) {
    console.error('Error getting similar vehicles:', error);
    return NextResponse.json(
      { error: 'Failed to get similar vehicles' },
      { status: 500 }
    );
  }
}