"""
Service layer registry
"""
from .user_service import UserService, UserProfileService
# Add other services as you create them

__all__ = [
    'UserService',
    'UserProfileService'
]

print("✅ Services package initialized")