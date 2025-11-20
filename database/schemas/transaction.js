// Transaction Schema for MongoDB
// Collection: transactions

{
  "_id": ObjectId,
  "transactionId": String, // Unique, format: TXN-YYYYMMDD-XXXXXX
  "userId": ObjectId, // Reference to users collection
  "bookingId": ObjectId, // Reference to bookings collection (nullable)
  "type": String, // Enum: BOOKING, REFUND, WALLET_TOPUP, WITHDRAWAL, REFERRAL_BONUS
  "amount": Number, // Required
  "currency": String, // Default: INR
  "paymentMethod": String, // RAZORPAY, PAYTM, UPI, WALLET, CASH
  "paymentGateway": String, // Gateway name
  "gatewayTransactionId": String, // Transaction ID from gateway
  "status": String, // Enum: PENDING, SUCCESS, FAILED, REFUNDED
  "description": String,
  "metadata": {
    // Additional gateway-specific data
  },
  "refundDetails": {
    "refundId": String,
    "refundAmount": Number,
    "refundedAt": Date,
    "refundReason": String
  },
  "createdAt": Date,
  "updatedAt": Date
}

// Indexes
db.transactions.createIndex({ "transactionId": 1 }, { unique: true });
db.transactions.createIndex({ "userId": 1 });
db.transactions.createIndex({ "bookingId": 1 });
db.transactions.createIndex({ "status": 1 });
db.transactions.createIndex({ "type": 1 });
db.transactions.createIndex({ "createdAt": -1 });
db.transactions.createIndex({ "gatewayTransactionId": 1 });

