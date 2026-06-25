from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import timedelta

from app.database import get_db
from app.models import User, Vehicle
from app.schemas import TokenResponse, LoginRequest, VehicleLoginRequest
from login import verify_password, create_access_token
from config import get_settings

settings = get_settings()

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/login", response_model=dict)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": str(user.id), "role": user.role}, expires_delta=timedelta(minutes=settings.access_token_expire_minutes))
    return {"access_token": token, "token_type": "bearer", "user_id": user.id, "role": user.role}


@router.post("/vehicle-login", response_model=dict)
def vehicle_login(payload: VehicleLoginRequest, db: Session = Depends(get_db)):
    vehicle = db.query(Vehicle).filter(Vehicle.plate == payload.plate.upper()).first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")

    # PIN verification: vehicle.pin_hash stores hashed PIN
    if not verify_password(payload.pin, vehicle.pin_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # create token for owner user
    token = create_access_token({"sub": str(vehicle.owner_id), "role": "vehicle_owner"}, expires_delta=timedelta(minutes=settings.access_token_expire_minutes))
    return {"access_token": token, "token_type": "bearer", "user_id": vehicle.owner_id, "vehicle_id": vehicle.id}
