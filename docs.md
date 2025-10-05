# API Endpoints for Car Dealership Website

Based on the car dealership website we've been building, here's an outline of the essential API endpoints you'll need to create:

## Vehicle Endpoints

1. **GET /api/vehicles**
   - Purpose: Get a paginated list of vehicles with filtering options
   - Query parameters: 
     - `page`: Page number
     - `limit`: Items per page
     - `make`: Filter by manufacturer
     - `model`: Filter by model
     - `minYear`/`maxYear`: Year range
     - `minPrice`/`maxPrice`: Price range
     - `condition`: New, Used, Certified Pre-Owned
     - `bodyType`: SUV, Sedan, Truck, etc.
     - `search`: Text search across fields
   - Response: List of vehicles with pagination metadata

2. **GET /api/vehicles/:id**
   - Purpose: Get detailed information about a specific vehicle
   - Response: Complete vehicle information including specs, features, images

3. **POST /api/vehicles** (Admin only)
   - Purpose: Add a new vehicle to inventory
   - Body: Vehicle details

4. **PUT /api/vehicles/:id** (Admin only)
   - Purpose: Update an existing vehicle
   - Body: Updated vehicle details

5. **DELETE /api/vehicles/:id** (Admin only)
   - Purpose: Remove a vehicle from inventory

## Contact & Inquiry Endpoints

1. **POST /api/contact**
   - Purpose: Submit a general contact form
   - Body: Contact details and message

2. **POST /api/test-drive**
   - Purpose: Schedule a test drive for a specific vehicle
   - Body: Customer information, preferred dates/times, vehicle ID

3. **POST /api/financing/application**
   - Purpose: Submit a financing pre-approval application
   - Body: Applicant details, employment info, desired vehicle, etc.

4. **POST /api/trade-in/estimate**
   - Purpose: Request a trade-in value estimate
   - Body: Current vehicle details (make, model, year, condition, etc.)

## User Account Endpoints (If implementing user accounts)

1. **POST /api/auth/register**
   - Purpose: Create new user account
   - Body: User information

2. **POST /api/auth/login**
   - Purpose: Authenticate user
   - Body: Credentials
   - Response: Authentication token

3. **GET /api/user/profile**
   - Purpose: Get current user's profile
   - Response: User data

4. **PUT /api/user/profile**
   - Purpose: Update user profile
   - Body: Updated profile information

5. **GET /api/user/favorites**
   - Purpose: Get user's saved/favorite vehicles
   - Response: List of favorited vehicles

6. **POST /api/user/favorites/:vehicleId**
   - Purpose: Add vehicle to favorites
   - Response: Updated favorites list

## Newsletter & Marketing

1. **POST /api/newsletter/subscribe**
   - Purpose: Subscribe to newsletter
   - Body: Email address, opt-in preferences

## Admin & Management Endpoints

1. **GET /api/admin/dashboard**
   - Purpose: Get dashboard statistics
   - Response: Inventory counts, recent inquiries, etc.

2. **GET /api/admin/inquiries**
   - Purpose: Get list of customer inquiries
   - Response: Paginated list of inquiries

3. **POST /api/admin/upload-images**
   - Purpose: Upload vehicle images
   - Body: Multipart form data with images

## Example Implementation Details

For each endpoint, you'll want to implement:

1. **Authentication & Authorization**
   - Public endpoints: Open to all users
   - Protected endpoints: Require user login
   - Admin endpoints: Require admin privileges

2. **Validation**
   - Input validation for all POST/PUT requests
   - Sanitize user input to prevent injection attacks

3. **Error Handling**
   - Consistent error response format
   - Meaningful error messages for debugging

4. **Response Format**
   - Consistent JSON structure
   - Include metadata for paginated responses

