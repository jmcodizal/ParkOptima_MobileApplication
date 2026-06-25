from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional

# User Schemas
class UserCreate(BaseModel):
    first_name: str
    last_name: str
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    password: str
    role: str = "vehicle_owner"

class UserResponse(BaseModel):
    id: int
    first_name: Optional[str]
    last_name: Optional[str]
    email: Optional[str]
    phone: Optional[str]
    role: str
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# Vehicle Schemas
class VehicleCreate(BaseModel):
    plate: str
    make: Optional[str] = None
    model: Optional[str] = None
    color: Optional[str] = None
    type: str = "Car"
    pin: str  # 4-digit PIN

class VehicleResponse(BaseModel):
    id: int
    plate: str
    make: Optional[str]
    model: Optional[str]
    color: Optional[str]
    type: str
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class VehicleDetail(VehicleResponse):
    owner_id: int

# Wallet Schemas
class WalletResponse(BaseModel):
    id: int
    balance: float
    currency: str
    updated_at: datetime
    
    class Config:
        from_attributes = True

class BalanceCheckRequest(BaseModel):
    plate: str

class BalanceCheckResponse(BaseModel):
    plate: str
    owner_name: str
    balance: float
    currency: str
    vehicle_type: str
    registered_at: Optional[datetime]

# Parking Session Schemas
class ParkingSessionCreate(BaseModel):
    vehicle_id: int
    lot_id: Optional[int] = None
    notes: Optional[str] = None

class ParkingSessionResponse(BaseModel):
    id: int
    session_uuid: str
    vehicle_id: int
    status: str
    start_time: datetime
    end_time: Optional[datetime]
    fee: float
    currency: str
    
    class Config:
        from_attributes = True

class ParkingSessionEnd(BaseModel):
    session_id: int
    fee: Optional[float] = None

# Transaction Schemas
class TransactionResponse(BaseModel):
    id: int
    transaction_uuid: str
    amount: float
    currency: str
    method: str
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True

# Auth Schemas
class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int

class LoginRequest(BaseModel):
    email: str
    password: str

class VehicleLoginRequest(BaseModel):
    plate: str
    pin: str
