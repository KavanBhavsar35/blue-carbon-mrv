"""
Central model registry - imports all models for SQLAlchemy discovery
"""
from .user import User
from .user_profile import UserProfile
# from .project import Project
# from .carbon_credit import CarbonCredit
# from .transaction import Transaction
# from .iot_device import IoTDevice
# from .measurement import Measurement
# from .verification import Verification
# from .account import Account
# from .session import Session
# from .project_user import ProjectUser

# Export all models
__all__ = [
    'User',
    'UserProfile', 
    # 'Project',
    # 'CarbonCredit',
    # 'Transaction',
    # 'IoTDevice',
    # 'Measurement',
    # 'Verification',
    # 'Account',
    # 'Session',
    # 'ProjectUser'
]

print("✅ Models package initialized - all models imported")