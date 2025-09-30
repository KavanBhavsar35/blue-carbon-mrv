from app.extensions import db
from app.models.user import User
from app.models.user_profile import UserProfile
from sqlalchemy.exc import IntegrityError
import logging

logger = logging.getLogger(__name__)

class UserService:
    """Service layer for user operations"""
    
    @staticmethod
    def create_user(user_data, profile_data=None):
        """Create a new user with optional profile"""
        try:
            # Create user
            user = User(**user_data)
            db.session.add(user)
            
            # Create profile if data provided
            if profile_data:
                profile_data['user_id'] = user.id
                profile = UserProfile(**profile_data)
                db.session.add(profile)
            
            db.session.commit()
            logger.info(f"✅ User created successfully: {user.email}")
            return user
            
        except IntegrityError as e:
            db.session.rollback()
            logger.error(f"❌ Integrity error creating user: {str(e)}")
            raise ValueError("User with this email already exists")
        except Exception as e:
            db.session.rollback()
            logger.error(f"❌ Error creating user: {str(e)}")
            raise
    
    @staticmethod
    def get_user_by_id(user_id):
        """Get user by ID with profile"""
        return User.query.options(db.joinedload(User.profile)).get(user_id)
    
    @staticmethod
    def get_user_by_email(email):
        """Get user by email with profile"""
        return User.query.options(db.joinedload(User.profile)).filter_by(
            email=email.lower().strip()
        ).first()
    
    @staticmethod
    def update_user(user_id, update_data):
        """Update user information"""
        user = User.get_by_id(user_id)
        if not user:
            raise ValueError("User not found")
        
        try:
            user.update(**update_data)
            logger.info(f"✅ User updated: {user_id}")
            return user
        except Exception as e:
            logger.error(f"❌ Error updating user {user_id}: {str(e)}")
            raise
    
    @staticmethod
    def delete_user(user_id):
        """Delete user and cascade to profile"""
        user = User.get_by_id(user_id)
        if not user:
            raise ValueError("User not found")
        
        try:
            user.delete()
            logger.info(f"✅ User deleted: {user_id}")
            return True
        except Exception as e:
            logger.error(f"❌ Error deleting user {user_id}: {str(e)}")
            raise

class UserProfileService:
    """Service layer for user profile operations"""
    
    @staticmethod
    def create_profile(profile_data):
        """Create user profile"""
        try:
            profile = UserProfile(**profile_data)
            db.session.add(profile)
            db.session.commit()
            logger.info(f"✅ Profile created for user: {profile_data['user_id']}")
            return profile
        except IntegrityError as e:
            db.session.rollback()
            logger.error(f"❌ Integrity error creating profile: {str(e)}")
            raise ValueError("Profile already exists for this user")
        except Exception as e:
            db.session.rollback()
            logger.error(f"❌ Error creating profile: {str(e)}")
            raise
    
    @staticmethod
    def update_profile(user_id, update_data):
        """Update user profile"""
        profile = UserProfile.query.filter_by(user_id=user_id).first()
        if not profile:
            raise ValueError("Profile not found")
        
        try:
            profile.update(**update_data)
            logger.info(f"✅ Profile updated for user: {user_id}")
            return profile
        except Exception as e:
            logger.error(f"❌ Error updating profile for user {user_id}: {str(e)}")
            raise
    
    @staticmethod
    def update_credit_stats(user_id, earned=0, sold=0, bought=0):
        """Update user credit statistics"""
        profile = UserProfile.query.filter_by(user_id=user_id).first()
        if not profile:
            raise ValueError("Profile not found")
        
        try:
            profile.total_credits_earned += earned
            profile.total_credits_sold += sold
            profile.total_credits_bought += bought
            db.session.commit()
            logger.info(f"✅ Credit stats updated for user: {user_id}")
            return profile
        except Exception as e:
            db.session.rollback()
            logger.error(f"❌ Error updating credit stats for user {user_id}: {str(e)}")
            raise