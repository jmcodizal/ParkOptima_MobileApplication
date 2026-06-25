from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, ForeignKey, JSON, Enum, DECIMAL
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.database import Base

class RoleEnum(str, enum.Enum):
    attendant = "attendant"
    vehicle_owner = "vehicle_owner"
    admin = "admin"

class StatusEnum(str, enum.Enum):
    active = "active"
    completed = "completed"
    cancelled = "cancelled"
    no_show = "no_show"

class TransactionStatusEnum(str, enum.Enum):
    pending = "pending"
    completed = "completed"
    failed = "failed"
    refunded = "refunded"

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    role = Column(Enum(RoleEnum), default=RoleEnum.vehicle_owner)
    first_name = Column(String(100), nullable=True)
    last_name = Column(String(100), nullable=True)
    email = Column(String(255), unique=True, nullable=True, index=True)
    phone = Column(String(32), nullable=True, index=True)
    password_hash = Column(String(255), nullable=True)
    password_salt = Column(String(255), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    vehicles = relationship("Vehicle", back_populates="owner")
    wallet = relationship("Wallet", uselist=False, back_populates="user")

class Vehicle(Base):
    __tablename__ = "vehicles"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    plate = Column(String(32), unique=True, nullable=False, index=True)
    make = Column(String(100), nullable=True)
    model = Column(String(100), nullable=True)
    color = Column(String(64), nullable=True)
    type = Column(String(50), default="Car")
    registered_at = Column(DateTime, nullable=True)
    pin_hash = Column(String(255), nullable=True)
    pin_salt = Column(String(255), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    owner = relationship("User", back_populates="vehicles")

class Wallet(Base):
    __tablename__ = "wallets"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    balance = Column(DECIMAL(12, 2), default=0.00)
    currency = Column(String(8), default="USD")
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="wallet")

class ParkingLot(Base):
    __tablename__ = "parking_lots"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(150), nullable=False, index=True)
    address = Column(String(255), nullable=True)
    city = Column(String(100), nullable=True)
    country = Column(String(100), nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    capacity = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class ParkingSession(Base):
    __tablename__ = "parking_sessions"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    session_uuid = Column(String(36), unique=True, nullable=False)
    vehicle_id = Column(Integer, ForeignKey("vehicles.id"), nullable=False, index=True)
    owner_user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    attendant_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    lot_id = Column(Integer, ForeignKey("parking_lots.id"), nullable=True)
    start_time = Column(DateTime, default=datetime.utcnow)
    end_time = Column(DateTime, nullable=True)
    duration_seconds = Column(Integer, nullable=True)
    status = Column(Enum(StatusEnum), default=StatusEnum.active, index=True)
    fee = Column(DECIMAL(10, 2), default=0.00)
    currency = Column(String(8), default="USD")
    notes = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Transaction(Base):
    __tablename__ = "transactions"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    transaction_uuid = Column(String(36), unique=True, nullable=False)
    session_id = Column(Integer, ForeignKey("parking_sessions.id"), nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    attendant_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    amount = Column(DECIMAL(10, 2), nullable=False)
    currency = Column(String(8), default="USD")
    method = Column(String(50), default="card")
    status = Column(Enum(TransactionStatusEnum), default=TransactionStatusEnum.pending)
    reference = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
