from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import get_settings
from app.database import Base, engine
from app.routes import vehicles, users, auth

settings = get_settings()

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title=settings.api_title,
    version=settings.api_version,
    description="ParkOptima - Smart Parking Management System API"
)

# CORS middleware (allow mobile app to connect)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(vehicles.router)
app.include_router(users.router)
app.include_router(auth.router)

@app.get("/")
def root():
    """API Health Check"""
    return {
        "message": "ParkOptima API",
        "version": settings.api_version,
        "status": "operational"
    }

@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.debug
    )
