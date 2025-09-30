"""
Blueprints package - registers all Flask blueprints
"""
from .api import bp as api_bp
from .blockchain import bp as blockchain_bp  
# from .aimodels import bp as aimodels_bp

__all__ = ['api_bp', 'blockchain_bp',]

print("✅ Blueprints package initialized")