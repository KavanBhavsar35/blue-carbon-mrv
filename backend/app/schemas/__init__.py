"""
Schema registry for easy imports
"""
from .user_schemas import UserSchema, UserCreateSchema, UserUpdateSchema
from .user_profile_schemas import UserProfileSchema, UserProfileCreateSchema

__all__ = [
    'UserSchema',
    'UserCreateSchema', 
    'UserUpdateSchema',
    'UserProfileSchema',
    'UserProfileCreateSchema'
]