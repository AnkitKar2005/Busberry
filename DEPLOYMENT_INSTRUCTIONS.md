# BusBerry - Deployment Instructions

## ⚠️ Important Note

There are compilation errors due to Lombok not generating getters/setters. The easiest solution is to use Docker Compose.

## 🐳 Docker Deployment (Easiest - Recommended)

```bash
# Navigate to project root
cd "D:\bus berry"

# Start all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

This will automatically:
- Start MongoDB
- Build and run the Spring Boot backend
- All services will be available

## 📋 Manual Deployment

### Prerequisites
- Java 17+
- Maven 3.8+
- MongoDB 6.0+

### Step 1: Fix pom.xml
Open `backend/pom.xml` and change line 18:
```xml
<n>BusBerry Backend</n>
```
to:
```xml
<name>BusBerry Backend</name>
```

### Step 2: Start MongoDB
```bash
mongod
```

### Step 3: Build Backend
```bash
cd backend
mvn clean install -DskipTests
```

### Step 4: Run Backend
```bash
mvn spring-boot:run
```

### Step 5: Serve Frontend
Open a new terminal:
```bash
cd frontend
python -m http.server 8000
```

## 🌐 Access the Application

- **Frontend**: http://localhost:8000
- **Backend API**: http://localhost:8080/api
- **API Documentation**: http://localhost:8080/swagger-ui.html
- **Health Check**: http://localhost:8080/actuator/health

## ✅ Verify Deployment

1. Check backend health:
   ```bash
   curl http://localhost:8080/actuator/health
   ```

2. Open frontend in browser:
   ```
   http://localhost:8000
   ```

3. Test API:
   ```bash
   curl http://localhost:8080/api/search/popular
   ```

## 🔧 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check connection string in `application.properties`

### Port Already in Use
- Change port in `application.properties`: `server.port=8081`
- Or stop the service using the port

### Compilation Errors
- Use Docker Compose (handles everything automatically)
- Or fix pom.xml and ensure Lombok plugin is installed in IDE

## 📝 Next Steps

Once deployed:
1. Register a new user
2. Test search functionality
3. Explore the API documentation
4. Check the dashboards

---

**For best results, use Docker Compose!**

