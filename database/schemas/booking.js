// Booking Schema for MongoDB
// Collection: bookings

{
  "_id": ObjectId,
  "bookingId": String, // Unique, format: BB-YYYYMMDD-XXXXXX
  "userId": ObjectId, // Reference to users collection
  "operatorId": ObjectId, // Reference to users collection
  "busId": ObjectId, // Reference to buses collection
  "routeId": ObjectId, // Reference to routes collection
  "tripDate": Date, // Required
  "seats": [{
    "seatNumber": String, // Required
    "passengerName": String, // Required
    "passengerAge": Number,
    "passengerGender": String,
    "idProof": String,
    "idNumber": String,
    "price": Number // Price at booking time
  }],
  "boardingPoint": {
    "location": String,
    "coordinates": {
      "lat": Number,
      "lng": Number
    },
    "time": Date
  },
  "droppingPoint": {
    "location": String,
    "coordinates": {
      "lat": Number,
      "lng": Number
    },
    "time": Date
  },
  "totalAmount": Number, // Required
  "discount": Number, // Default: 0
  "couponCode": String,
  "finalAmount": Number, // totalAmount - discount
  "paymentStatus": String, // Enum: PENDING, PAID, FAILED, REFUNDED
  "paymentMethod": String, // RAZORPAY, PAYTM, UPI, WALLET
  "paymentId": String, // Transaction ID from payment gateway
  "bookingStatus": String, // Enum: CONFIRMED, CANCELLED, COMPLETED, NO_SHOW
  "cancellationReason": String,
  "cancelledAt": Date,
  "refundAmount": Number, // Default: 0
  "refundStatus": String, // Enum: NONE, PENDING, PROCESSED, FAILED
  "qrCode": String, // Encrypted QR code data
  "ticketPdf": String, // URL to PDF
  "insurance": {
    "included": Boolean,
    "amount": Number,
    "policyNumber": String
  },
  "gpsTracking": {
    "enabled": Boolean,
    "trackingUrl": String
  },
  "notifications": {
    "smsSent": Boolean,
    "emailSent": Boolean,
    "whatsappSent": Boolean
  },
  "createdAt": Date,
  "updatedAt": Date,
  "expiresAt": Date // Auto-expiry after journey
}

// Indexes
db.bookings.createIndex({ "bookingId": 1 }, { unique: true });
db.bookings.createIndex({ "userId": 1 });
db.bookings.createIndex({ "operatorId": 1 });
db.bookings.createIndex({ "busId": 1 });
db.bookings.createIndex({ "routeId": 1 });
db.bookings.createIndex({ "tripDate": 1 });
db.bookings.createIndex({ "bookingStatus": 1 });
db.bookings.createIndex({ "paymentStatus": 1 });
db.bookings.createIndex({ "createdAt": -1 });
db.bookings.createIndex({ "userId": 1, "bookingStatus": 1 });

