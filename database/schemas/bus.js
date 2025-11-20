// Bus Schema for MongoDB
// Collection: buses

{
  "_id": ObjectId,
  "operatorId": ObjectId, // Reference to users collection (operator)
  "busNumber": String, // Unique, required, e.g., "MH-01-AB-1234"
  "busName": String, // Required, e.g., "Volvo Multi-Axle"
  "busType": String, // Enum: SLEEPER, SEMI_SLEEPER, SEATER, AC_SLEEPER, NON_AC
  "totalSeats": Number, // Required
  "seatLayout": {
    "type": String, // 2x2, 2x1, etc.
    "rows": Number,
    "columns": Number,
    "seats": [{
      "seatNumber": String, // e.g., "A1", "B2"
      "seatType": String, // WINDOW, AISLE, MIDDLE, UPPER_BERTH, LOWER_BERTH
      "isLadiesSeat": Boolean,
      "isAvailable": Boolean,
      "price": Number, // Dynamic pricing per seat
      "amenities": [String] // LEG_SPACE, CHARGING, WIFI, etc.
    }]
  },
  "amenities": [String], // AC, WIFI, CHARGING, ENTERTAINMENT, BLANKET, PILLOW, WATER, SNACKS
  "features": {
    "isEcoFriendly": Boolean,
    "noiseRating": Number, // 1-5
    "comfortScore": Number, // AI-generated, 1-10
    "hasSilentCabin": Boolean,
    "ladiesSeatZone": Boolean
  },
  "images": [String], // URLs
  "digitalTwin3D": String, // URL to 3D model (optional)
  "registrationNumber": String, // Required
  "insuranceNumber": String,
  "insuranceExpiry": Date,
  "fitnessExpiry": Date,
  "permitExpiry": Date,
  "isActive": Boolean, // Default: true
  "isApproved": Boolean, // Default: false (admin approval required)
  "rating": Number, // Average rating, 1-5
  "totalReviews": Number, // Default: 0
  "createdAt": Date,
  "updatedAt": Date
}

// Indexes
db.buses.createIndex({ "operatorId": 1 });
db.buses.createIndex({ "busNumber": 1 }, { unique: true });
db.buses.createIndex({ "busType": 1 });
db.buses.createIndex({ "isActive": 1, "isApproved": 1 });
db.buses.createIndex({ "rating": -1 });

