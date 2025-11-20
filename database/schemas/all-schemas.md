# BusBerry MongoDB Database Schemas

This document contains all database schemas for the BusBerry platform.

## Collections Overview

1. **users** - User accounts (passengers, operators, admins)
2. **buses** - Bus fleet information
3. **routes** - Bus routes and schedules
4. **bookings** - Ticket bookings
5. **drivers** - Driver information
6. **coupons** - Discount coupons and offers
7. **transactions** - Payment transactions
8. **withdrawals** - Operator earnings withdrawals
9. **reviews** - User reviews and ratings
10. **fleet_maintenance** - Bus maintenance logs
11. **analytics** - Analytics and metrics
12. **heatmaps** - Demand/route heatmaps
13. **gps_logs** - GPS tracking logs
14. **notifications** - Notification records
15. **audit_logs** - System audit logs
16. **referral_system** - Referral tracking
17. **loyalty_points** - Loyalty point transactions
18. **price_history** - Dynamic pricing history
19. **demand_forecast** - AI demand predictions

## Schema Files

- `user.js` - User schema
- `bus.js` - Bus schema
- `route.js` - Route schema
- `booking.js` - Booking schema
- `driver.js` - Driver schema
- `coupon.js` - Coupon schema
- `transaction.js` - Transaction schema
- `withdrawal.js` - Withdrawal schema
- `review.js` - Review schema
- `fleet_maintenance.js` - Maintenance schema
- `analytics.js` - Analytics schema
- `heatmap.js` - Heatmap schema
- `gps_log.js` - GPS log schema
- `notification.js` - Notification schema
- `audit_log.js` - Audit log schema
- `referral.js` - Referral schema
- `loyalty.js` - Loyalty schema
- `price_history.js` - Price history schema
- `demand_forecast.js` - Demand forecast schema

## Indexes

All collections have appropriate indexes for:
- Primary keys (_id)
- Foreign keys (references)
- Frequently queried fields
- Text search fields
- Time-based queries

## Relationships

- users → buses (operatorId)
- users → bookings (userId, operatorId)
- buses → routes (busId)
- routes → bookings (routeId)
- bookings → transactions (bookingId)
- users → reviews (userId)
- buses → reviews (busId)

## Data Validation

All schemas include:
- Required field validation
- Type validation
- Enum validation
- Format validation (email, phone, etc.)
- Referential integrity

## Security

- Passwords are hashed using BCrypt
- Sensitive data is encrypted
- Audit logs track all changes
- Role-based access control

