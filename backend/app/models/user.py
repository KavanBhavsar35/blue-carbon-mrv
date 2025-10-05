from app.database.base import BaseModel
from app.extensions import db
from sqlalchemy.orm import relationship
from .auth import Session, Account

import uuid

class User(BaseModel):
    """
    User Model
    - One-to-one relationship with UserProfile
    - One-to-many relationships with Session, Account, Transaction, ProjectUser
    - Cascading delete for dependent records
    """
    __tablename__ = 'users'
    
    # Basic fields
    name = db.Column(db.String(100))
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    email_verified = db.Column(db.Boolean, default=False, nullable=False)
    image = db.Column(db.Text)
    
    # Relationships with explicit cascade definitions
    profile = relationship(
        "UserProfile", 
        backref="user", 
        uselist=False, 
        lazy="select",
        cascade="all, delete-orphan",
        passive_deletes=True
    )
    
    # sessions = relationship(
    #     "Session", 
    #     backref="user", 
    #     lazy="dynamic",
    #     cascade="all, delete-orphan",
    #     passive_deletes=True
    # )
    sessions = relationship("Session", back_populates="user", cascade="all, delete-orphan")
    accounts = relationship("Account", back_populates="user", cascade="all, delete-orphan")
    
    # Transactions where user is sender
    # sent_transactions = relationship(
    #     "Transaction",
    #     foreign_keys="Transaction.from_user_id",
    #     backref="from_user",
    #     lazy="dynamic"
    # )
    
    # Transactions where user is receiver  
    # received_transactions = relationship(
    #     "Transaction",
    #     foreign_keys="Transaction.to_user_id", 
    #     backref="to_user",
    #     lazy="dynamic"
    # )
    
    # Projects the user is associated with
    # projects = relationship(
    #     "ProjectUser",
    #     backref="user",
    #     lazy="dynamic",
    #     cascade="all, delete-orphan",
    #     passive_deletes=True
    # )
    
    def __repr__(self):
        return f"<User(id='{self.id}', email='{self.email}')>"
    
    def to_dict(self):
        """Convert user to dictionary"""
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'email_verified': self.email_verified,
            'image': self.image,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    @classmethod
    def get_by_email(cls, email):
        """Get user by email"""
        return cls.query.filter_by(email=email.lower().strip()).first()