# BusBerry Quick Start Guide

## 5-Minute Setup

### Step 1: Install Dependencies

**MongoDB:**
```bash
# macOS
brew install mongodb-community

# Windows
# Download from https://www.mongodb.com/try/download/community

# Linux
sudo apt-get install mongodb
```

**Java & Maven:**
```bash
# macOS
brew install openjdk@17 maven

# Windows/Linux
# Download from official websites
```

### Step 2: Start MongoDB

```bash
# macOS/Linux
mongod

# Windows
# Start MongoDB service from Services panel
```

### Step 3: Configure Backend

Edit `backend/src/main/resources/application.properties`:

```properties
# Update MongoDB URI if needed
spring.data.mongodb.uri=mongodb://localhost:27017/busberry

# Generate a secure JWT secret (256 bits)
jwt.secret=your-secure-secret-key-here
```

### Step 4: Run Backend

```bash
cd backend
mvn spring-boot:run
```

Wait for: `🚌 BusBerry Backend Started`

### Step 5: Open Frontend

```bash
cd frontend
# Open index.html in browser
# Or use a local server:
python -m http.server 8000
```

Visit: `http://localhost:8000`

## First Admin User

The system creates a default admin user on first run:
- Email: `admin@busberry.in`
- Password: `Admin@123` (change in production!)

## Test the System

1. **Register a User:**
   - Click "Sign Up" on homepage
   - Fill registration form
   - Verify email/phone

2. **Search Buses:**
   - Enter source and destination
   - Select date
   - Click "Search Buses"

3. **View API Docs:**
   - Visit: `http://localhost:8080/swagger-ui.html`

## Next Steps

- Read [API Documentation](API_DOCUMENTATION.md)
- Check [Deployment Guide](DEPLOYMENT.md)
- Explore the codebase
- Customize for your needs

## Troubleshooting

**Backend won't start:**
- Check MongoDB is running
- Verify Java 17+ is installed
- Check port 8080 is available

**Frontend not loading:**
- Check browser console for errors
- Verify all CSS/JS files are present
- Try a different browser

**Database connection error:**
- Verify MongoDB is running: `mongosh`
- Check connection string in application.properties
- Ensure database exists

## Need Help?

- Check [Deployment Guide](DEPLOYMENT.md) for detailed setup
- Review [API Documentation](API_DOCUMENTATION.md)
- Open an issue on GitHub

