from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Vehicle, User, Wallet, ParkingSession
from app.schemas import VehicleResponse, BalanceCheckRequest, BalanceCheckResponse, VehicleCreate
from datetime import datetime

router = APIRouter(prefix="/api/vehicles", tags=["vehicles"])

@router.get("/balance")
def check_vehicle_balance(plate: str, db: Session = Depends(get_db)):
    """Check parking balance by license plate"""
    vehicle = db.query(Vehicle).filter(Vehicle.plate == plate.upper()).first()
    
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    
    wallet = db.query(Wallet).filter(Wallet.user_id == vehicle.owner_id).first()
    owner = db.query(User).filter(User.id == vehicle.owner_id).first()
    
    return BalanceCheckResponse(
        plate=vehicle.plate,
        owner_name=f"{owner.first_name} {owner.last_name}".strip() if owner else "Unknown",
        balance=float(wallet.balance) if wallet else 0.0,
        currency=wallet.currency if wallet else "USD",
        vehicle_type=vehicle.type,
        registered_at=vehicle.registered_at
    )

@router.get("/by-plate/{plate}", response_model=VehicleResponse)
def get_vehicle_by_plate(plate: str, db: Session = Depends(get_db)):
    """Get vehicle details by license plate"""
    vehicle = db.query(Vehicle).filter(Vehicle.plate == plate.upper()).first()
    
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    
    return vehicle

@router.get("/{vehicle_id}", response_model=VehicleResponse)
def get_vehicle(vehicle_id: int, db: Session = Depends(get_db)):
    """Get vehicle details by ID"""
    vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()
    
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    
    return vehicle

@router.get("/{vehicle_id}/active-session")
def get_active_session(vehicle_id: int, db: Session = Depends(get_db)):
    """Get current active parking session for vehicle"""
    session = db.query(ParkingSession).filter(
        ParkingSession.vehicle_id == vehicle_id,
        ParkingSession.status == "active"
    ).first()
    
    if not session:
        raise HTTPException(status_code=404, detail="No active session")
    
    return {
        "session_id": session.id,
        "session_uuid": session.session_uuid,
        "start_time": session.start_time,
        "lot_id": session.lot_id,
        "status": session.status
    }

@router.post("/", response_model=VehicleResponse)
def create_vehicle(vehicle: VehicleCreate, owner_id: int, db: Session = Depends(get_db)):
    """Create a new vehicle (admin/owner only)"""
    existing = db.query(Vehicle).filter(Vehicle.plate == vehicle.plate.upper()).first()
    if existing:
        raise HTTPException(status_code=400, detail="Vehicle plate already exists")
    
    db_vehicle = Vehicle(
        owner_id=owner_id,
        plate=vehicle.plate.upper(),
        make=vehicle.make,
        model=vehicle.model,
        color=vehicle.color,
        type=vehicle.type,
        pin_hash="hashed_pin_here",  # TODO: hash the PIN with bcrypt
        pin_salt="salt_here"
    )
    db.add(db_vehicle)
    db.commit()
    db.refresh(db_vehicle)
    return db_vehicle
