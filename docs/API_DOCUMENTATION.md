# BusBerry API Documentation

## Base URL
```
http://localhost:8080/api
```

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Register User
```
POST /api/auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "phone": "+919876543210",
  "password": "SecurePassword123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "refreshToken": "refresh_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "role": "USER"
  }
}
```

#### Login
```
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

#### Send OTP
```
POST /api/auth/otp/send
```

**Request Body:**
```json
{
  "phone": "+919876543210",
  "type": "VERIFICATION" // or "LOGIN", "RESET_PASSWORD"
}
```

#### Verify OTP
```
POST /api/auth/otp/verify
```

**Request Body:**
```json
{
  "phone": "+919876543210",
  "otp": "123456"
}
```

### Search

#### Search Buses
```
GET /api/search/buses?from=Mumbai&to=Pune&date=2024-12-25&passengers=2
```

**Query Parameters:**
- `from` (required): Source city
- `to` (required): Destination city
- `date` (required): Travel date (YYYY-MM-DD)
- `passengers` (optional): Number of passengers (default: 1)
- `seatType` (optional): SLEEPER, SEMI_SLEEPER, SEATER
- `maxPrice` (optional): Maximum price filter
- `amenities` (optional): Comma-separated amenities

**Response:**
```json
{
  "results": [
    {
      "busId": "bus_id",
      "busName": "Volvo Multi-Axle",
      "operatorName": "Operator Name",
      "departureTime": "22:00",
      "arrivalTime": "06:00",
      "duration": "8h",
      "availableSeats": 15,
      "price": 1200,
      "rating": 4.5,
      "amenities": ["AC", "WIFI", "CHARGING"],
      "comfortScore": 8.5
    }
  ],
  "total": 10
}
```

#### Get Popular Routes
```
GET /api/search/popular
```

#### Get City Suggestions
```
GET /api/search/suggestions?q=Mum
```

### Booking

#### Create Booking
```
POST /api/booking/create
```

**Request Body:**
```json
{
  "routeId": "route_id",
  "busId": "bus_id",
  "tripDate": "2024-12-25",
  "seats": [
    {
      "seatNumber": "A1",
      "passengerName": "John Doe",
      "passengerAge": 30,
      "passengerGender": "MALE",
      "idProof": "AADHAR",
      "idNumber": "1234 5678 9012"
    }
  ],
  "boardingPoint": {
    "location": "Mumbai Central",
    "coordinates": {
      "lat": 18.9388,
      "lng": 72.8353
    }
  },
  "couponCode": "FIRST50"
}
```

**Response:**
```json
{
  "bookingId": "BB-20241225-123456",
  "status": "CONFIRMED",
  "totalAmount": 1200,
  "discount": 50,
  "finalAmount": 1150,
  "qrCode": "encrypted_qr_data",
  "ticketPdf": "https://..."
}
```

#### Get Booking Details
```
GET /api/booking/{bookingId}
```

#### Cancel Booking
```
POST /api/booking/{bookingId}/cancel
```

**Request Body:**
```json
{
  "reason": "Change of plans"
}
```

#### Get Booking History
```
GET /api/booking/history?page=0&size=10
```

### User

#### Get Profile
```
GET /api/user/profile
```

#### Update Profile
```
PUT /api/user/profile
```

#### Get Wallet
```
GET /api/user/wallet
```

#### Get Loyalty Points
```
GET /api/user/loyalty
```

### Operator

#### Get Dashboard
```
GET /api/operator/dashboard
```

#### Get Buses
```
GET /api/operator/buses
```

#### Add Bus
```
POST /api/operator/buses
```

#### Get Bookings
```
GET /api/operator/bookings
```

#### Get Earnings
```
GET /api/operator/earnings?from=2024-01-01&to=2024-12-31
```

### Admin

#### Get Dashboard
```
GET /api/admin/dashboard
```

#### Get Users
```
GET /api/admin/users?page=0&size=20
```

#### Get Operators
```
GET /api/admin/operators
```

#### Get Analytics
```
GET /api/admin/analytics?type=revenue&period=monthly
```

## Error Responses

All errors follow this format:

```json
{
  "error": "Error Type",
  "message": "Detailed error message",
  "status": 400,
  "timestamp": "2024-12-25T10:00:00Z"
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

- Public endpoints: 100 requests/minute
- Authenticated endpoints: 1000 requests/minute
- Admin endpoints: 5000 requests/minute

## WebSocket

### Connect
```
ws://localhost:8080/ws
```

### Topics
- `/topic/gps/{busId}` - GPS tracking updates
- `/topic/notifications/{userId}` - User notifications
- `/topic/bookings/{operatorId}` - Operator booking updates

## Swagger UI

Interactive API documentation available at:
```
http://localhost:8080/swagger-ui.html
```

