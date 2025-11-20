# BusBerry - Next-Generation Intelligent Bus Booking Ecosystem

**Domain:** busberry.in  
**Tagline:** "Your Journey, Reimagined"

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Maven 3.8+
- MongoDB 6.0+
- Node.js (optional, for frontend tools)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd bus-berry
```

2. **Start MongoDB**
```bash
# macOS/Linux
mongod

# Windows - Start MongoDB service
```

3. **Run Backend**
```bash
cd backend
mvn spring-boot:run
```

4. **Open Frontend**
```bash
cd frontend
# Open index.html in browser or use a local server
python -m http.server 8000
```

5. **Access the Application**
- Frontend: http://localhost:8000
- Backend API: http://localhost:8080/api
- API Docs: http://localhost:8080/swagger-ui.html
- Health Check: http://localhost:8080/actuator/health

## 🐳 Docker Deployment

```bash
docker-compose up -d
```

## ✨ Features

### For Passengers
- ✅ AI-powered search & recommendations
- ✅ Real-time bus tracking
- ✅ Secure booking system
- ✅ Loyalty program
- ✅ Wallet management
- ✅ Booking history

### For Operators
- ✅ Fleet management
- ✅ Booking management
- ✅ Earnings tracking
- ✅ Route management

### For Admins
- ✅ User management
- ✅ Operator management
- ✅ Analytics dashboard
- ✅ System monitoring

## 📁 Project Structure

```
bus-berry/
├── frontend/          # Frontend application
├── backend/           # Spring Boot backend
├── database/          # MongoDB schemas
├── docs/              # Documentation
└── docker-compose.yml # Docker configuration
```

## 🔐 Default Credentials

**Admin User (Auto-created):**
- Email: admin@busberry.in
- Password: Admin@123

⚠️ **Change these in production!**

## 📚 Documentation

- [API Documentation](docs/API_DOCUMENTATION.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Quick Start Guide](docs/QUICK_START.md)
- [Architecture](docs/ARCHITECTURE.md)

## 🛠️ Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Backend:** Java 17, Spring Boot 3.2.0
- **Database:** MongoDB 6.0+
- **Security:** JWT, BCrypt, Spring Security
- **Documentation:** Swagger/OpenAPI

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Search
- `POST /api/search/buses` - Search buses
- `GET /api/search/popular` - Get popular routes

### Booking
- `POST /api/booking/create` - Create booking
- `GET /api/booking/{id}` - Get booking details
- `GET /api/booking/history` - Get booking history
- `POST /api/booking/{id}/cancel` - Cancel booking

### User
- `GET /api/user/profile` - Get user profile

## 🔧 Configuration

Edit `backend/src/main/resources/application.properties`:

```properties
# MongoDB
spring.data.mongodb.uri=mongodb://localhost:27017/busberry

# JWT Secret (change in production!)
jwt.secret=your-256-bit-secret-key
```

## 🚀 Deployment

See [DEPLOYMENT_READY.md](DEPLOYMENT_READY.md) for complete deployment checklist.

## 📄 License

Proprietary - BusBerry Technologies

## 👥 Support

For issues and questions:
- Email: support@busberry.in
- Documentation: See `/docs` directory

---

**Built with ❤️ for India's travelers**
