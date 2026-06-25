# ParkOptima Backend (FastAPI)

Python FastAPI backend for ParkOptima smart parking management system.

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI app setup
│   ├── database.py             # SQLAlchemy configuration
│   ├── models.py               # Database models
│   ├── schemas.py              # Pydantic request/response schemas
│   └── routes/
│       ├── __init__.py
│       ├── vehicles.py         # Vehicle endpoints
│       └── users.py            # User endpoints
├── config.py                   # Settings & configuration
├── requirements.txt            # Python dependencies
├── .env.example                # Environment variables template
└── README.md                   # This file
```

## Setup Instructions

### 1. Navigate to Backend Folder
```bash
cd backend
```

### 2. Create Python Virtual Environment
```bash
python -m venv venv
```

Activate it:
- **Windows (PowerShell):**
  ```powershell
  .\venv\Scripts\Activate.ps1
  ```
- **Windows (CMD):**
  ```cmd
  venv\Scripts\activate.bat
  ```
- **Mac/Linux:**
  ```bash
  source venv/bin/activate
  ```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure Environment
Copy `.env.example` to `.env` and update values:
```bash
cp .env.example .env
```

Edit `.env` with your MySQL connection details:
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=parkuser
DB_PASSWORD=your_db_password
DB_NAME=parkoptima
```

### 5. Run the Server
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

### API Docs
- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

## Key Endpoints

### Vehicles
- `GET /api/vehicles/balance?plate=ABC1234` - Check vehicle balance
- `GET /api/vehicles/by-plate/{plate}` - Get vehicle details
- `GET /api/vehicles/{vehicle_id}` - Get vehicle by ID
- `GET /api/vehicles/{vehicle_id}/active-session` - Get active parking session

### Users
- `POST /api/users/register` - Register new user
- `GET /api/users/{user_id}` - Get user details
- `GET /api/users/email/{email}` - Get user by email

### Health
- `GET /` - API root
- `GET /health` - Health check

## Database Setup

Before running the backend, ensure MySQL is running and the database is created:

```sql
CREATE DATABASE parkoptima;
```

Run the MySQL schema from `../parkoptima.sql` or the schema provided in the main project README.

## Development

### Add New Routes
1. Create new file in `app/routes/` (e.g., `parking.py`)
2. Define router with `APIRouter(prefix="/api/parking", tags=["parking"])`
3. Add endpoints with route decorators
4. Include router in `app/main.py`: `app.include_router(parking.router)`

### Add Database Models
1. Define new model class in `app/models.py` inheriting from `Base`
2. Define Pydantic schemas in `app/schemas.py`
3. Create routes to handle the model

## Production Deployment

### Before Going Live:
1. Set `DEBUG=False` in `.env`
2. Change `JWT_SECRET_KEY` to a strong, unique value
3. Update CORS `allow_origins` to specific domains
4. Use a production ASGI server (Gunicorn, Uvicorn cluster)
5. Enable HTTPS/SSL
6. Use environment secrets management (AWS Secrets Manager, etc.)

### Run with Gunicorn (Production):
```bash
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app --bind 0.0.0.0:8000
```

## Connect from Mobile App

From your React Native/Expo app, make HTTP requests to `http://localhost:8000` (or your server URL):

```javascript
const response = await fetch('http://localhost:8000/api/vehicles/balance?plate=ABC1234');
const data = await response.json();
console.log(data);
```

For production, replace with your actual domain.
