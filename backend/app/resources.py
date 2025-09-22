from flask_restful import Resource
from flask import request
from marshmallow import ValidationError
from app import db
# --- ProjectUser API ---
class ProjectUserResource(Resource):
    def get(self, id):
        from app.models import ProjectUser
        from app.schemas import ProjectUserSchema
        project_user = ProjectUser.query.get_or_404(id)
        schema = ProjectUserSchema()
        return schema.dump(project_user)

    def put(self, id):
        from app.models import ProjectUser
        from app.schemas import ProjectUserSchema
        project_user = ProjectUser.query.get_or_404(id)
        schema = ProjectUserSchema()
        try:
            data = schema.load(request.get_json(), partial=True)
            for key, value in data.items():
                setattr(project_user, key, value)
        except ValidationError as err:
            return {"errors": err.messages}, 400
        db.session.commit()
        return schema.dump(project_user)

    def delete(self, id):
        from app.models import ProjectUser
        project_user = ProjectUser.query.get_or_404(id)
        db.session.delete(project_user)
        db.session.commit()
        return '', 204

class ProjectUserListResource(Resource):
    def get(self):
        from app.models import ProjectUser
        from app.schemas import ProjectUserSchema
        project_users = ProjectUser.query.all()
        schema = ProjectUserSchema(many=True)
        return schema.dump(project_users)

    def post(self):
        from app.models import ProjectUser
        from app.schemas import ProjectUserSchema
        schema = ProjectUserSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return {"errors": err.messages}, 400
        project_user = ProjectUser(**data)
        db.session.add(project_user)
        db.session.commit()
        return schema.dump(project_user), 201

# --- UserProfile API ---
class UserProfileResource(Resource):
    def get(self, id):
        from app.models import UserProfile
        from app.schemas import UserProfileSchema
        user_profile = UserProfile.query.get_or_404(id)
        schema = UserProfileSchema()
        return schema.dump(user_profile)

    def put(self, id):
        from app.models import UserProfile
        from app.schemas import UserProfileSchema
        user_profile = UserProfile.query.get_or_404(id)
        schema = UserProfileSchema()
        try:
            data = schema.load(request.get_json(), partial=True)
            for key, value in data.items():
                setattr(user_profile, key, value)
        except ValidationError as err:
            return {"errors": err.messages}, 400
        db.session.commit()
        return schema.dump(user_profile)

    def delete(self, id):
        from app.models import UserProfile
        user_profile = UserProfile.query.get_or_404(id)
        db.session.delete(user_profile)
        db.session.commit()
        return '', 204

class UserProfileListResource(Resource):
    def get(self):
        from app.models import UserProfile
        from app.schemas import UserProfileSchema
        user_profiles = UserProfile.query.all()
        schema = UserProfileSchema(many=True)
        return schema.dump(user_profiles)

    def post(self):
        from app.models import UserProfile
        from app.schemas import UserProfileSchema
        schema = UserProfileSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return {"errors": err.messages}, 400
        user_profile = UserProfile(**data)
        db.session.add(user_profile)
        db.session.commit()
        return schema.dump(user_profile), 201

# --- CarbonCredit API ---
class CarbonCreditResource(Resource):
    def get(self, id):
        from app.models import CarbonCredit
        from app.schemas import CarbonCreditSchema
        credit = CarbonCredit.query.get_or_404(id)
        schema = CarbonCreditSchema()
        return schema.dump(credit)

    def put(self, id):
        from app.models import CarbonCredit
        from app.schemas import CarbonCreditSchema
        credit = CarbonCredit.query.get_or_404(id)
        schema = CarbonCreditSchema()
        try:
            data = schema.load(request.get_json(), partial=True)
            for key, value in data.items():
                setattr(credit, key, value)
        except ValidationError as err:
            return {"errors": err.messages}, 400
        db.session.commit()
        return schema.dump(credit)

    def delete(self, id):
        from app.models import CarbonCredit
        credit = CarbonCredit.query.get_or_404(id)
        db.session.delete(credit)
        db.session.commit()
        return '', 204

class CarbonCreditListResource(Resource):
    def get(self):
        from app.models import CarbonCredit
        from app.schemas import CarbonCreditSchema
        credits = CarbonCredit.query.all()
        schema = CarbonCreditSchema(many=True)
        return schema.dump(credits)

    def post(self):
        from app.models import CarbonCredit
        from app.schemas import CarbonCreditSchema
        schema = CarbonCreditSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return {"errors": err.messages}, 400
        credit = CarbonCredit(**data)
        db.session.add(credit)
        db.session.commit()
        return schema.dump(credit), 201

# --- Transaction API ---
class TransactionResource(Resource):
    def get(self, id):
        from app.models import Transaction
        from app.schemas import TransactionSchema
        transaction = Transaction.query.get_or_404(id)
        schema = TransactionSchema()
        return schema.dump(transaction)

    def put(self, id):
        from app.models import Transaction
        from app.schemas import TransactionSchema
        transaction = Transaction.query.get_or_404(id)
        schema = TransactionSchema()
        try:
            data = schema.load(request.get_json(), partial=True)
            for key, value in data.items():
                setattr(transaction, key, value)
        except ValidationError as err:
            return {"errors": err.messages}, 400
        db.session.commit()
        return schema.dump(transaction)

    def delete(self, id):
        from app.models import Transaction
        transaction = Transaction.query.get_or_404(id)
        db.session.delete(transaction)
        db.session.commit()
        return '', 204

class TransactionListResource(Resource):
    def get(self):
        from app.models import Transaction
        from app.schemas import TransactionSchema
        transactions = Transaction.query.all()
        schema = TransactionSchema(many=True)
        return schema.dump(transactions)

    def post(self):
        from app.models import Transaction
        from app.schemas import TransactionSchema
        schema = TransactionSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return {"errors": err.messages}, 400
        transaction = Transaction(**data)
        db.session.add(transaction)
        db.session.commit()
        return schema.dump(transaction), 201

class UserResource(Resource):
    def get(self, id):
        from app.models import User
        from app.schemas import UserSchema
        
        user = User.query.get_or_404(id)
        schema = UserSchema()
        return schema.dump(user)

    def put(self, id):
        from app.models import User
        from app.schemas import UserSchema
        
        user = User.query.get_or_404(id)
        schema = UserSchema()
        try:
            data = schema.load(request.get_json(), partial=True)
            for key, value in data.items():
                setattr(user, key, value)
        except ValidationError as err:
            return {"errors": err.messages}, 400
        
        db.session.commit()
        return schema.dump(user)

    def delete(self, id):
        from app.models import User
        
        user = User.query.get_or_404(id)
        db.session.delete(user)
        db.session.commit()
        return '', 204

class UserListResource(Resource):
    def get(self):
        from app.models import User
        from app.schemas import UserSchema
        
        users = User.query.all()
        schema = UserSchema(many=True)
        return schema.dump(users)

    def post(self):
        from app.models import User
        from app.schemas import UserSchema
        
        schema = UserSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return {"errors": err.messages}, 400
        
        user = User(**data)
        db.session.add(user)
        db.session.commit()
        return schema.dump(user), 201

class ProjectResource(Resource):
    def get(self, id):
        from app.models import Project
        from app.schemas import ProjectSchema
        
        project = Project.query.get_or_404(id)
        schema = ProjectSchema()
        return schema.dump(project)

    def put(self, id):
        from app.models import Project
        from app.schemas import ProjectSchema
        
        project = Project.query.get_or_404(id)
        schema = ProjectSchema()
        try:
            data = schema.load(request.get_json(), partial=True)
            for key, value in data.items():
                setattr(project, key, value)
        except ValidationError as err:
            return {"errors": err.messages}, 400
        
        db.session.commit()
        return schema.dump(project)

    def delete(self, id):
        from app.models import Project
        
        project = Project.query.get_or_404(id)
        db.session.delete(project)
        db.session.commit()
        return '', 204

class ProjectListResource(Resource):
    def get(self):
        from app.models import Project
        from app.schemas import ProjectSchema
        
        projects = Project.query.all()
        schema = ProjectSchema(many=True)
        return schema.dump(projects)

    def post(self):
        from app.models import Project
        from app.schemas import ProjectSchema
        
        schema = ProjectSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return {"errors": err.messages}, 400
        
        project = Project(**data)
        db.session.add(project)
        db.session.commit()
        return schema.dump(project), 201

def register_resources(api):
    """Register all resources with the API"""
    print("\n🔗 Registering Flask-RESTful Resources:")
    print("=" * 50)
    
    try:
        # User resources
        print("🔄 Registering UserListResource...")
        api.add_resource(UserListResource, '/users')
        print("✅ UserListResource -> GET,POST /users")

        print("🔄 Registering UserResource...")
        api.add_resource(UserResource, '/users/<string:id>')
        print("✅ UserResource -> GET,PUT,DELETE /users/<id>")

        # Project resources
        print("🔄 Registering ProjectListResource...")
        api.add_resource(ProjectListResource, '/projects')
        print("✅ ProjectListResource -> GET,POST /projects")

        print("🔄 Registering ProjectResource...")
        api.add_resource(ProjectResource, '/projects/<string:id>')
        print("✅ ProjectResource -> GET,PUT,DELETE /projects/<id>")

        # ProjectUser resources
        print("🔄 Registering ProjectUserListResource...")
        api.add_resource(ProjectUserListResource, '/project-users')
        print("✅ ProjectUserListResource -> GET,POST /project-users")

        print("🔄 Registering ProjectUserResource...")
        api.add_resource(ProjectUserResource, '/project-users/<string:id>')
        print("✅ ProjectUserResource -> GET,PUT,DELETE /project-users/<id>")

        # UserProfile resources
        print("🔄 Registering UserProfileListResource...")
        api.add_resource(UserProfileListResource, '/user-profiles')
        print("✅ UserProfileListResource -> GET,POST /user-profiles")

        print("🔄 Registering UserProfileResource...")
        api.add_resource(UserProfileResource, '/user-profiles/<string:id>')
        print("✅ UserProfileResource -> GET,PUT,DELETE /user-profiles/<id>")

        # CarbonCredit resources
        print("🔄 Registering CarbonCreditListResource...")
        api.add_resource(CarbonCreditListResource, '/carbon-credits')
        print("✅ CarbonCreditListResource -> GET,POST /carbon-credits")

        print("🔄 Registering CarbonCreditResource...")
        api.add_resource(CarbonCreditResource, '/carbon-credits/<string:id>')
        print("✅ CarbonCreditResource -> GET,PUT,DELETE /carbon-credits/<id>")

        # Transaction resources
        print("🔄 Registering TransactionListResource...")
        api.add_resource(TransactionListResource, '/transactions')
        print("✅ TransactionListResource -> GET,POST /transactions")

        print("🔄 Registering TransactionResource...")
        api.add_resource(TransactionResource, '/transactions/<string:id>')
        print("✅ TransactionResource -> GET,PUT,DELETE /transactions/<id>")

        print("=" * 50)
        print("🎯 Total Flask-RESTful Resources Registered: 12")
        print("=" * 50)
    except Exception as e:
        print(f"❌ Error in register_resources: {e}")
        import traceback
        traceback.print_exc()
        raise
