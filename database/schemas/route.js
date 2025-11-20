// Route Schema for MongoDB
// Collection: routes

{
  "_id": ObjectId,
  "operatorId": ObjectId, // Reference to users collection
  "busId": ObjectId, // Reference to buses collection
  "from": {
    "city": String, // Required
    "state": String,
    "location": String, // Bus stand/stop name
    "coordinates": {
      "lat": Number,
      "lng": Number
    }
  },
  "to": {
    "city": String, // Required
    "state": String,
    "location": String,
    "coordinates": {
      "lat": Number,
      "lng": Number
    }
  },
  "via": [{
    "city": String,
    "location": String,
    "coordinates": {
      "lat": Number,
      "lng": Number
    },
    "stopTime": Number // Minutes to wait
  }],
  "distance": Number, // Kilometers
  "duration": Number, // Minutes
  "departureTime": String, // HH:mm format
  "arrivalTime": String, // HH:mm format
  "daysOfWeek": [Number], // 0=Sunday, 1=Monday, etc.
  "basePrice": Number, // Base fare
  "dynamicPricing": {
    "enabled": Boolean,
    "minPrice": Number,
    "maxPrice": Number,
    "currentMultiplier": Number // 1.0 = base price
  },
  "isActive": Boolean, // Default: true
  "totalBookings": Number, // Default: 0
  "averageRating": Number, // Default: 0
  "createdAt": Date,
  "updatedAt": Date
}

// Indexes
db.routes.createIndex({ "operatorId": 1 });
db.routes.createIndex({ "busId": 1 });
db.routes.createIndex({ "from.city": 1, "to.city": 1 });
db.routes.createIndex({ "isActive": 1 });
db.routes.createIndex({ "departureTime": 1 });
db.routes.createIndex({ "daysOfWeek": 1 });

