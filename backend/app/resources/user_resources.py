from flask_restful import Resource, reqparse
from flask import request, current_app
from marshmallow import ValidationError

from app.services.user_service import UserService
from app.schemas.user_schemas import UserSchema, UserCreateSchema, UserUpdateSchema

# Request parsers
user_parser = reqparse.RequestParser()
user_parser.add_argument("email", type=str, help="Email for user lookup")


class UserResource(Resource):
    """Single user resource"""

    def get(self, user_id):
        """Get user by ID"""
        current_app.logger.debug(f"GET user request for ID: {user_id}")

        try:
            user = UserService.get_user_by_id(user_id)
            if not user:
                return {"error": "User not found"}, 404

            schema = UserSchema()
            return schema.dump(user), 200

        except Exception as e:
            current_app.logger.error(f"Error getting user {user_id}: {str(e)}")
            return {"error": "Internal server error"}, 500

    def put(self, user_id):
        """Update user"""
        current_app.logger.debug(f"PUT user request for ID: {user_id}")

        try:
            schema = UserUpdateSchema()
            data = schema.load(request.get_json())

            user = UserService.update_user(user_id, data)
            response_schema = UserSchema()
            return response_schema.dump(user), 200

        except ValueError as e:
            return {"error": str(e)}, 404
        except ValidationError as e:
            return {"errors": e.messages}, 400
        except Exception as e:
            current_app.logger.error(f"Error updating user {user_id}: {str(e)}")
            return {"error": "Internal server error"}, 500

    def delete(self, user_id):
        """Delete user"""
        current_app.logger.debug(f"DELETE user request for ID: {user_id}")

        try:
            UserService.delete_user(user_id)
            return {"message": "User deleted successfully"}, 200

        except ValueError as e:
            return {"error": str(e)}, 404
        except Exception as e:
            current_app.logger.error(f"Error deleting user {user_id}: {str(e)}")
            return {"error": "Internal server error"}, 500


class UserListResource(Resource):
    """User collection resource"""

    def get(self):
        """Get all users"""
        current_app.logger.debug("GET all users request")

        try:
            users = UserService.get_all_users()
            schema = UserSchema(many=True)
            return schema.dump(users), 200

        except Exception as e:
            current_app.logger.error(f"Error getting users: {str(e)}")
            return {"error": "Internal server error"}, 500

    def post(self):
        """Create new user"""
        current_app.logger.debug("POST create user request")

        try:
            schema = UserCreateSchema()
            data = schema.load(request.get_json())

            user = UserService.create_user(data)
            response_schema = UserSchema()
            return response_schema.dump(user), 201

        except ValidationError as e:
            return {"errors": e.messages}, 400
        except ValueError as e:
            return {"error": str(e)}, 400
        except Exception as e:
            current_app.logger.error(f"Error creating user: {str(e)}")
            return {"error": "Internal server error"}, 500


class UserLookupResource(Resource):
    """User lookup by email"""

    def get(self):
        """Get user by email"""
        user_parser = reqparse.RequestParser()
        user_parser.add_argument(
            "email", type=str, required=True, help="Email is required", location="args"
        )
        args = user_parser.parse_args()
        email = args.get("email")

        current_app.logger.debug(f"User lookup request for email: {email}")

        try:
            user = UserService.get_user_by_email(email)
            if not user:
                return {"error": "User not found"}, 404

            schema = UserSchema()
            return {
                "success": True,
                "message": "User found",
                "data": schema.dump(user),
            }, 200

        except Exception as e:
            current_app.logger.error(f"Error looking up user {email}: {str(e)}")
            return {"error": "Internal server error"}, 500
