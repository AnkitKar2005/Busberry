// Coupon Schema for MongoDB
// Collection: coupons

{
  "_id": ObjectId,
  "code": String, // Unique, required, uppercase
  "name": String, // Required
  "description": String,
  "type": String, // Enum: PERCENTAGE, FIXED_AMOUNT
  "value": Number, // Discount value
  "minPurchaseAmount": Number, // Minimum booking amount
  "maxDiscountAmount": Number, // Maximum discount (for percentage)
  "validFrom": Date, // Required
  "validTo": Date, // Required
  "usageLimit": Number, // Total usage limit, null = unlimited
  "usedCount": Number, // Default: 0
  "usageLimitPerUser": Number, // Default: 1
  "applicableRoutes": [ObjectId], // Empty = all routes
  "applicableBusTypes": [String], // Empty = all types
  "userEligibility": {
    "newUsersOnly": Boolean,
    "loyaltyTier": [String], // Empty = all tiers
    "minLoyaltyPoints": Number
  },
  "isActive": Boolean, // Default: true
  "createdBy": ObjectId, // Admin user ID
  "createdAt": Date,
  "updatedAt": Date
}

// Indexes
db.coupons.createIndex({ "code": 1 }, { unique: true });
db.coupons.createIndex({ "isActive": 1, "validFrom": 1, "validTo": 1 });
db.coupons.createIndex({ "createdAt": -1 });

