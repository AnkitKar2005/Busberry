# BusBerry Deployment Guide

## Prerequisites

- Java 17 or higher
- Maven 3.8+
- MongoDB 6.0+
- Node.js 18+ (for frontend tools, optional)
- Git

## Local Development Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd bus-berry
```

### 2. MongoDB Setup

#### Install MongoDB
- **Windows**: Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
- **macOS**: `brew install mongodb-community`
- **Linux**: Follow [MongoDB Installation Guide](https://www.mongodb.com/docs/manual/installation/)

#### Start MongoDB
```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
# or
mongod --dbpath /path/to/data
```

#### Create Database
```bash
mongo
use busberry
```

### 3. Backend Setup

```bash
cd backend

# Configure application.properties
# Update MongoDB URI if needed
# Set JWT secret (generate a secure 256-bit key)
# Configure email/SMS credentials

# Build project
mvn clean install

# Run application
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 4. Frontend Setup

```bash
cd frontend

# Open index.html in a browser
# Or use a local server:
python -m http.server 8000
# or
npx serve .
```

Frontend will be available at `http://localhost:8000`

### 5. Verify Installation

- Backend Health: `http://localhost:8080/actuator/health`
- API Docs: `http://localhost:8080/swagger-ui.html`
- Frontend: `http://localhost:8000`

## Environment Variables

Create `.env` file in backend directory:

```env
JWT_SECRET=your-256-bit-secret-key-here
ADMIN_PASSWORD=secure-admin-password
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
SMS_ACCOUNT_SID=your-twilio-sid
SMS_AUTH_TOKEN=your-twilio-token
SMS_FROM_NUMBER=+1234567890
RAZORPAY_KEY_ID=your-razorpay-key
RAZORPAY_KEY_SECRET=your-razorpay-secret
```

## Production Deployment

### Backend Deployment

#### Option 1: JAR File
```bash
cd backend
mvn clean package
java -jar target/busberry-backend-1.0.0.jar
```

#### Option 2: Docker
```bash
# Build image
docker build -t busberry-backend .

# Run container
docker run -p 8080:8080 \
  -e JWT_SECRET=your-secret \
  -e MONGODB_URI=mongodb://host:27017/busberry \
  busberry-backend
```

#### Option 3: Cloud Platforms
- **AWS**: Elastic Beanstalk, ECS, or EC2
- **Google Cloud**: App Engine or Cloud Run
- **Azure**: App Service
- **Heroku**: Standard deployment

### Frontend Deployment

#### Option 1: Static Hosting
- **Netlify**: Connect GitHub repo, auto-deploy
- **Vercel**: Connect GitHub repo, auto-deploy
- **AWS S3 + CloudFront**: Upload files to S3, configure CloudFront
- **GitHub Pages**: Push to gh-pages branch

#### Option 2: CDN
Upload frontend files to CDN (CloudFlare, AWS CloudFront, etc.)

### MongoDB Deployment

#### Option 1: MongoDB Atlas (Recommended)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create cluster
3. Get connection string
4. Update `application.properties` with Atlas URI

#### Option 2: Self-Hosted
- Install MongoDB on server
- Configure replica set for production
- Enable authentication
- Set up backups

## Security Checklist

- [ ] Change default JWT secret
- [ ] Set strong admin password
- [ ] Enable MongoDB authentication
- [ ] Configure CORS properly
- [ ] Enable HTTPS/SSL
- [ ] Set up firewall rules
- [ ] Configure rate limiting
- [ ] Enable audit logging
- [ ] Set up monitoring
- [ ] Configure backups

## Monitoring

### Application Monitoring
- **Spring Boot Actuator**: `/actuator/health`, `/actuator/metrics`
- **Prometheus + Grafana**: For metrics visualization
- **ELK Stack**: For log aggregation

### Database Monitoring
- MongoDB Compass for GUI
- MongoDB Atlas monitoring (if using Atlas)

## Scaling Strategy

### Horizontal Scaling
- Deploy multiple backend instances behind load balancer
- Use MongoDB replica set
- Implement Redis for session/cache management

### Vertical Scaling
- Increase server resources (CPU, RAM)
- Optimize database queries
- Add indexes

### Caching
- Redis for frequently accessed data
- CDN for static assets
- Browser caching

## Backup Strategy

### Database Backups
```bash
# Manual backup
mongodump --uri="mongodb://localhost:27017/busberry" --out=/backup

# Automated backup (cron job)
0 2 * * * mongodump --uri="mongodb://localhost:27017/busberry" --out=/backup/$(date +\%Y\%m\%d)
```

### Application Backups
- Version control (Git)
- Container images
- Configuration files

## Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check if MongoDB is running
   - Verify connection string
   - Check firewall rules

2. **JWT Token Invalid**
   - Verify JWT secret matches
   - Check token expiration
   - Ensure token format is correct

3. **CORS Errors**
   - Update CORS configuration in SecurityConfig
   - Verify allowed origins

4. **Port Already in Use**
   - Change port in application.properties
   - Kill process using the port

## Support

For issues and questions:
- GitHub Issues: [repository-url]/issues
- Email: support@busberry.in
- Documentation: [docs-url]

