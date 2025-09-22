
# File: config.py
from dotenv import load_dotenv
import os

load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///bluecarbon.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY', 'your_secret_key_here')
    DEBUG = os.getenv('DEBUG', 'False').lower() in ['true', '1', 't']

# ===============================================================================
# File: app/__init__.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api

# Initialize extensions
db = SQLAlchemy()
api = Api()

def create_app(config_class='config.Config'):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize extensions with app
    db.init_app(app)
    api.init_app(app)
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return {"error": "Resource not found"}, 404
    
    @app.route('/')
    def home():
        return "<h1>Welcome to the Blue Carbon Project API</h1>"
    
    # Import and register after app context is set
    with app.app_context():
        # Import models after db is initialized
        from app import models
        
        # Create tables
        db.create_all()
        
        # Register blueprints
        from app.routes import bp as api_bp
        app.register_blueprint(api_bp, url_prefix='/api')
        
        # Register resources
        from app.resources import register_resources
        register_resources(api)
    
    return app

# ===============================================================================
# File: app/models.py
from app import db
from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(120), unique=True, nullable=False)
    email_verified = db.Column(db.Boolean, default=False, nullable=False)
    image = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

class Verification(db.Model):
    __tablename__ = 'verifications'
    id = db.Column(db.String(50), primary_key=True)
    identifier = db.Column(db.String(100), nullable=False)
    value = db.Column(db.String(100), nullable=False)
    expires_at = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

class ProjectUser(db.Model):
    __tablename__ = 'project_users'
    id = db.Column(db.String(50), primary_key=True)
    project_id = db.Column(db.String(50), db.ForeignKey('projects.id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False)
    user_id = db.Column(db.String(50), db.ForeignKey('users.id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False)
    role = db.Column(db.String(20), default='VIEWER', nullable=False)
    joined_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

class UserProfile(db.Model):
    __tablename__ = 'user_profiles'
    
    id = db.Column(db.String(50), primary_key=True)
    user_id = db.Column(db.String(50), db.ForeignKey('users.id'), nullable=False)
    role = db.Column(db.String(20), default='USER', nullable=False)
    wallet_address = db.Column(db.String(42), unique=True)
    organization = db.Column(db.String(200))
    country = db.Column(db.String(100))
    phone_number = db.Column(db.String(20))
    bio = db.Column(db.Text)
    total_credits_earned = db.Column(db.Float, default=0, nullable=False)
    total_credits_sold = db.Column(db.Float, default=0, nullable=False)
    total_credits_bought = db.Column(db.Float, default=0, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

class Session(db.Model):
    __tablename__ = 'sessions'
    
    id = db.Column(db.String(50), primary_key=True)
    user_id = db.Column(db.String(50), db.ForeignKey('users.id'), nullable=False)
    token = db.Column(db.Text, unique=True, nullable=False)
    expires_at = db.Column(db.DateTime, nullable=False)
    ip_address = db.Column(db.String(45))
    user_agent = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

class Account(db.Model):
    __tablename__ = 'accounts'
    
    id = db.Column(db.String(50), primary_key=True)
    user_id = db.Column(db.String(50), db.ForeignKey('users.id'), nullable=False)
    account_id = db.Column(db.String(100), nullable=False)
    provider_id = db.Column(db.String(50), nullable=False)
    access_token = db.Column(db.Text)
    refresh_token = db.Column(db.Text)
    access_token_expires_at = db.Column(db.DateTime)
    refresh_token_expires_at = db.Column(db.DateTime)
    scope = db.Column(db.String(200))
    id_token = db.Column(db.Text)
    password = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.String(50), primary_key=True)
    organization_name = db.Column(db.String(200), nullable=False)
    organization_type = db.Column(db.String(50), nullable=False)
    registration_number = db.Column(db.String(100))
    contact_person = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    project_name = db.Column(db.String(200), nullable=False)
    project_description = db.Column(db.Text, nullable=False)
    project_type = db.Column(db.String(20), nullable=False)
    state = db.Column(db.String(100), nullable=False)
    district = db.Column(db.String(100), nullable=False)
    village = db.Column(db.String(100), nullable=False)
    coordinates = db.Column(db.JSON)
    total_area = db.Column(db.Float, nullable=False)
    estimated_credits_per_year = db.Column(db.Float, nullable=False)
    total_credits_generated = db.Column(db.Float, default=0, nullable=False)
    has_legal_permits = db.Column(db.Boolean, default=False, nullable=False)
    has_survey_report = db.Column(db.Boolean, default=False, nullable=False)
    has_environmental_clearance = db.Column(db.Boolean, default=False, nullable=False)
    contract_address = db.Column(db.String(100))
    token_id = db.Column(db.String(100))
    status = db.Column(db.String(20), default='PENDING', nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

class CarbonCredit(db.Model):
    __tablename__ = 'carbon_credits'
    
    id = db.Column(db.String(50), primary_key=True)
    project_id = db.Column(db.String(50), db.ForeignKey('projects.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    vintage = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(20), default='ACTIVE', nullable=False)
    blockchain_tx_hash = db.Column(db.String(66), unique=True)
    minted_at = db.Column(db.DateTime)
    burned_at = db.Column(db.DateTime)
    certification_body = db.Column(db.String(200))
    certification_id = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

class Transaction(db.Model):
    __tablename__ = 'transactions'
    
    id = db.Column(db.String(50), primary_key=True)
    transaction_type = db.Column(db.String(20), nullable=False)
    from_user_id = db.Column(db.String(50), db.ForeignKey('users.id'))
    to_user_id = db.Column(db.String(50), db.ForeignKey('users.id'))
    project_id = db.Column(db.String(50), db.ForeignKey('projects.id'))
    credit_id = db.Column(db.String(50), db.ForeignKey('carbon_credits.id'))
    amount = db.Column(db.Float, nullable=False)
    price_per_credit = db.Column(db.Float)
    total_price = db.Column(db.Float)
    currency = db.Column(db.String(10), default='ETH', nullable=False)
    tx_hash = db.Column(db.String(66), unique=True)
    block_number = db.Column(db.Integer)
    gas_used = db.Column(db.Float)
    status = db.Column(db.String(20), default='PENDING', nullable=False)
    meta_data = db.Column(db.JSON)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

class IoTDevice(db.Model):
    __tablename__ = 'iot_devices'
    
    id = db.Column(db.String(50), primary_key=True)
    device_id = db.Column(db.String(100), unique=True, nullable=False)
    name = db.Column(db.String(200), nullable=False)
    device_type = db.Column(db.String(20), nullable=False)
    project_id = db.Column(db.String(50), db.ForeignKey('projects.id'), nullable=False)
    status = db.Column(db.String(20), default='INACTIVE', nullable=False)
    last_ping = db.Column(db.DateTime)
    meta_data = db.Column(db.JSON)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

class Measurement(db.Model):
    __tablename__ = 'measurements'
    
    id = db.Column(db.String(50), primary_key=True)
    device_id = db.Column(db.String(50), db.ForeignKey('iot_devices.id'), nullable=False)
    project_id = db.Column(db.String(50), db.ForeignKey('projects.id'), nullable=False)
    measurement_type = db.Column(db.String(20), nullable=False)
    value = db.Column(db.Float, nullable=False)
    unit = db.Column(db.String(20), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    meta_data = db.Column(db.JSON)