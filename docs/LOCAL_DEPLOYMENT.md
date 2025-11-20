## Local Deployment (Frontend + Backend)

Follow these steps to run the complete BusBerry stack on `localhost`.

### 1. Prerequisites
- Java 17+
- Maven 3.8+
- MongoDB 6.x (local service or Docker)
- Python 3 (only for the static frontend web server)
- Optional: Docker Desktop if you prefer `docker-compose`

### 2. Start MongoDB
```bash
# Option A: native install
mongod --dbpath /path/to/data

# Option B: Docker
docker run --name busberry-mongo -p 27017:27017 -d mongo:6
```

### 3. Configure Backend
Edit `backend/src/main/resources/application.properties` (or export the env vars shown below):
```properties
spring.data.mongodb.uri=mongodb://localhost:27017/busberry
jwt.secret=change-me-please-256-bit
```

### 4. Run Backend (port 8080)
```bash
cd backend
mvn clean spring-boot:run
```
Check `http://localhost:8080/actuator/health` or `http://localhost:8080/swagger-ui.html`.

### 5. Serve Frontend (port 8000)
```bash
cd frontend
python -m http.server 8000
# or specify interface explicitly (Windows PowerShell):
python -m http.server 8000 --bind 127.0.0.1
```
Visit `http://localhost:8000` with your browser.

### 6. Verify Integration
1. Open DevTools → Network tab.
2. Perform a search from the homepage. The request should hit `http://localhost:8080/api/search/buses`.
3. Try registering/logging in via the auth pages; they call `/api/auth/...`.

### 7. Running Everything with Docker Compose
```bash
docker-compose up --build
```
This starts MongoDB, builds the backend, and exposes the APIs on port 8080. Serve the frontend separately (Step 5) to avoid CORS issues.

### 8. Troubleshooting
- **CORS errors**: confirm the frontend origin (e.g., `http://localhost:8000`) matches the allowed origins in `SecurityConfig`.
- **Mongo connection failures**: ensure MongoDB is running and reachable at the URI you configured.
- **Port clashes**: adjust `server.port` in `application.properties` or pass `-Dserver.port=xxxx`.
- **JWT issues**: delete old tokens in `localStorage` when you change `jwt.secret`.


