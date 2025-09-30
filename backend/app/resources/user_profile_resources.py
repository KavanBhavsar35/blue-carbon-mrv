from flask_restful import Resource, reqparse
from flask import request, current_app
from marshmallow import ValidationError

from app.services.user_service import UserProfileService
from app.schemas.user_profile_schemas import (
    UserProfileSchema, 
    UserProfileCreateSchema, 
    UserProfileUpdateSchema
)

# Request parsers
profile_parser = reqparse.RequestParser()
profile_parser.add_argument('user_id', type=str, help='User ID for profile lookup')

class UserProfileResource(Resource):
    """Single user profile resource"""

    def get(self, profile_id):
        """Get user profile by ID"""
        current_app.logger.debug(f"GET user profile request for ID: {profile_id}")

        try:
            user_profile = UserProfileService.get_user_profile_by_id(profile_id)
            if not user_profile:
                return {"error": "User profile not found"}, 404

            schema = UserProfileSchema()
            return schema.dump(user_profile), 200

        except Exception as e:
            current_app.logger.error(f"Error getting user profile {profile_id}: {str(e)}")
            return {"error": "Internal server error"}, 500
    
    def put(self, profile_id):
        """Update user profile"""
        current_app.logger.debug(f"PUT user profile request for ID: {profile_id}")

        try:
            schema = UserProfileUpdateSchema()
            data = schema.load(request.get_json())

            user_profile = UserProfileService.update_user_profile(profile_id, data)
            response_schema = UserProfileSchema()
            return response_schema.dump(user_profile), 200

        except ValueError as e:
            return {"error": str(e)}, 404
        except ValidationError as e:
            return {"errors": e.messages}, 400
        except Exception as e:
            current_app.logger.error(f"Error updating user profile {profile_id}: {str(e)}")
            return {"error": "Internal server error"}, 500
    
    def delete(self, profile_id):
        """Delete user profile"""
        current_app.logger.debug(f"DELETE user profile request for ID: {profile_id}")

        try:
            UserProfileService.delete_user_profile(profile_id)
            return {"message": "User profile deleted successfully"}, 200

        except ValueError as e:
            return {"error": str(e)}, 404
        except Exception as e:
            current_app.logger.error(f"Error deleting user profile {profile_id}: {str(e)}")
            return {"error": "Internal server error"}, 500

class UserProfileListResource(Resource):
    """User profile collection resource"""
    
    def get(self):
        """Get all user profiles"""
        current_app.logger.debug("GET all user profiles request")
        
        try:
            user_profiles = UserProfileService.get_all_user_profiles()
            schema = UserProfileSchema(many=True)
            return schema.dump(user_profiles), 200

        except Exception as e:
            current_app.logger.error(f"Error getting user profiles: {str(e)}")
            return {"error": "Internal server error"}, 500
    
    def post(self):
        """Create new user profile"""
        current_app.logger.debug("POST create user profile request")

        try:
            schema = UserProfileCreateSchema()
            data = schema.load(request.get_json())

            user_profile = UserProfileService.create_user_profile(data)
            response_schema = UserProfileSchema()
            return response_schema.dump(user_profile), 201

        except ValidationError as e:
            return {"errors": e.messages}, 400
        except ValueError as e:
            return {"error": str(e)}, 400
        except Exception as e:
            current_app.logger.error(f"Error creating user profile: {str(e)}")
            return {"error": "Internal server error"}, 500

class UserProfileLookupResource(Resource):
    """User profile lookup by user_id"""

    def get(self):
        """Get profile by user_id"""
        args = profile_parser.parse_args()
        user_id = args.get('user_id')
        
        if not user_id:
            return {"error": "user_id parameter is required"}, 400
        
        current_app.logger.debug(f"User profile lookup request for user_id: {user_id}")
        
        try:
            user_profile = UserProfileService.get_user_profile_by_user_id(user_id)
            if not user_profile:
                return {"error": "User profile not found"}, 404

            schema = UserProfileSchema()
            return {
                "success": True,
                "message": "User profile found",
                "data": schema.dump(user_profile)
            }, 200
            
        except Exception as e:
            current_app.logger.error(f"Error looking up user profile for user {user_id}: {str(e)}")
            return {"error": "Internal server error"}, 500
