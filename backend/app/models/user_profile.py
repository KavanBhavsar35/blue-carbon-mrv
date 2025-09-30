from app.database.base import BaseModel
from app.extensions import db
from sqlalchemy.orm import validates

class UserProfile(BaseModel):
    """
    UserProfile Model - Extended user information
    - One-to-one relationship with User
    - Contains carbon credit statistics and wallet info
    """
    __tablename__ = 'user_profiles'
    
    # Foreign key with cascade delete
    user_id = db.Column(
        db.String(50), 
        db.ForeignKey('users.id', ondelete='CASCADE'), 
        nullable=False, 
        unique=True,
        index=True
    )
    
    # Role and profile information
    role = db.Column(db.String(20), default='USER', nullable=False)
    wallet_address = db.Column(db.String(42), unique=True, index=True)
    organization = db.Column(db.String(200))
    country = db.Column(db.String(100))
    phone_number = db.Column(db.String(20))
    bio = db.Column(db.Text)
    
    # Carbon credit statistics
    total_credits_earned = db.Column(db.Float, default=0.0, nullable=False)
    total_credits_sold = db.Column(db.Float, default=0.0, nullable=False) 
    total_credits_bought = db.Column(db.Float, default=0.0, nullable=False)
    
    @validates('wallet_address')
    def validate_wallet_address(self, key, address):
        """Validate Ethereum wallet address format"""
        if address and not (address.startswith('0x') and len(address) == 42):
            raise ValueError("Invalid Ethereum wallet address format")
        return address
    
    @validates('email')
    def validate_email(self, key, email):
        """Email validation would be in User model"""
        return email
    
    def __repr__(self):
        return f"<UserProfile(user_id='{self.user_id}', role='{self.role}')>"
    
    def to_dict(self):
        """Convert profile to dictionary"""
        return {
            'id': self.id,
            'user_id': self.user_id,
            'role': self.role,
            'wallet_address': self.wallet_address,
            'organization': self.organization,
            'country': self.country,
            'phone_number': self.phone_number,
            'bio': self.bio,
            'total_credits_earned': self.total_credits_earned,
            'total_credits_sold': self.total_credits_sold,
            'total_credits_bought': self.total_credits_bought,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }