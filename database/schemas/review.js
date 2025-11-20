// Review Schema for MongoDB
// Collection: reviews

{
  "_id": ObjectId,
  "userId": ObjectId, // Reference to users collection
  "bookingId": ObjectId, // Reference to bookings collection
  "busId": ObjectId, // Reference to buses collection
  "operatorId": ObjectId, // Reference to users collection
  "routeId": ObjectId, // Reference to routes collection
  "rating": Number, // Required, 1-5
  "categories": {
    "comfort": Number, // 1-5
    "punctuality": Number,
    "cleanliness": Number,
    "driver": Number,
    "valueForMoney": Number
  },
  "title": String,
  "comment": String,
  "images": [String], // URLs
  "isVerified": Boolean, // Default: false (verified booking)
  "isHelpful": Number, // Count of helpful votes
  "isReported": Boolean, // Default: false
  "reportedReason": String,
  "isPublished": Boolean, // Default: true (admin can hide)
  "createdAt": Date,
  "updatedAt": Date
}

// Indexes
db.reviews.createIndex({ "userId": 1 });
db.reviews.createIndex({ "busId": 1 });
db.reviews.createIndex({ "operatorId": 1 });
db.reviews.createIndex({ "bookingId": 1 }, { unique: true }); // One review per booking
db.reviews.createIndex({ "rating": -1 });
db.reviews.createIndex({ "isPublished": 1, "createdAt": -1 });

