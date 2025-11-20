// User Schema for MongoDB
// Collection: users

{
  "_id": ObjectId,
  "email": String, // Unique, required
  "phone": String, // Unique, required, format: +91XXXXXXXXXX
  "password": String, // Hashed with BCrypt, required
  "firstName": String, // Required
  "lastName": String,
  "dateOfBirth": Date,
  "gender": String, // Enum: MALE, FEMALE, OTHER
  "role": String, // Enum: USER, OPERATOR, ADMIN, SUB_ADMIN
  "subRole": String, // For sub-admins: SUPPORT, FINANCE, TECH, MODERATION, MARKETING, RISK
  "isEmailVerified": Boolean, // Default: false
  "isPhoneVerified": Boolean, // Default: false
  "is2FAEnabled": Boolean, // Default: false
  "twoFactorSecret": String, // For 2FA
  "profileImage": String, // URL
  "address": {
    "street": String,
    "city": String,
    "state": String,
    "pincode": String,
    "country": String // Default: India
  },
  "wallet": {
    "balance": Number, // Default: 0
    "currency": String // Default: INR
  },
  "loyaltyPoints": Number, // Default: 0
  "loyaltyTier": String, // Enum: BRONZE, SILVER, GOLD, PLATINUM
  "referralCode": String, // Unique, auto-generated
  "referredBy": String, // User ID who referred
  "savedPassengers": [{
    "name": String,
    "age": Number,
    "gender": String,
    "idProof": String, // Aadhar, PAN, etc.
    "idNumber": String
  }],
  "savedRoutes": [{
    "from": String,
    "to": String,
    "preferredTime": String
  }],
  "deviceFingerprints": [{
    "fingerprint": String,
    "deviceInfo": String,
    "lastUsed": Date
  }],
  "isActive": Boolean, // Default: true
  "isBlocked": Boolean, // Default: false
  "blockedReason": String,
  "lastLogin": Date,
  "ipWhitelist": [String], // For admin users
  "createdAt": Date, // Auto-generated
  "updatedAt": Date, // Auto-updated
  "createdBy": String, // User ID
  "updatedBy": String // User ID
}

// Indexes
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "phone": 1 }, { unique: true });
db.users.createIndex({ "referralCode": 1 }, { unique: true });
db.users.createIndex({ "role": 1 });
db.users.createIndex({ "loyaltyTier": 1 });
db.users.createIndex({ "createdAt": -1 });

