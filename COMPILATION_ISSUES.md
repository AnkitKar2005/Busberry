# Compilation Issues & Solutions

## Current Issues

The project has compilation errors because Lombok is not generating getters/setters. This is a common issue that needs to be resolved.

## Quick Fix Steps

### 1. Fix pom.xml
The pom.xml has `<n>` instead of `<name>` on line 18. Manually change:
```xml
<n>BusBerry Backend</n>
```
to:
```xml
<name>BusBerry Backend</name>
```

### 2. Ensure Lombok is Working
Lombok should generate getters/setters automatically. If not:
- Make sure your IDE has Lombok plugin installed
- Rebuild the project
- Or manually add getters/setters (not recommended)

### 3. Alternative: Use Docker
The easiest way to deploy is using Docker Compose which handles all dependencies:

```bash
docker-compose up -d
```

## Manual Deployment Steps

1. **Fix pom.xml** - Change `<n>` to `<name>`
2. **Start MongoDB**:
   ```bash
   mongod
   ```

3. **Build Backend**:
   ```bash
   cd backend
   mvn clean install -DskipTests
   ```

4. **Run Backend**:
   ```bash
   mvn spring-boot:run
   ```

5. **Serve Frontend**:
   ```bash
   cd frontend
   python -m http.server 8000
   ```

## Docker Deployment (Recommended)

```bash
docker-compose up -d
```

This will:
- Start MongoDB
- Build and run the backend
- All services will be available

## Access Points

- Frontend: http://localhost:8000
- Backend: http://localhost:8080
- API Docs: http://localhost:8080/swagger-ui.html

