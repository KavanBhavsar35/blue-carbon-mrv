from flask import Flask, jsonify, request
from flask_restful import Api
from flask_cors import CORS
import logging
from datetime import datetime

from config import Config
from app.extensions import db, migrate

def create_app(config_class=Config):
    """Application factory pattern with enhanced logging"""
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Setup logging
    setup_logging(app)
    
    # Initialize extensions
    CORS(app)
    db.init_app(app)
    migrate.init_app(app, db)
    
    api = Api(app, prefix='/api')  # Add prefix here
    
    # Register blueprints (non-API routes)
    register_blueprints(app)
    
    # Register API resources
    register_resources(api)
    
    # Error handlers
    register_error_handlers(app)
    
    # Database initialization
    with app.app_context():
        init_database(app)
    
    return app

def setup_logging(app):
    """Configure application logging"""
    if app.config['DEBUG']:
        logging.basicConfig(
            level=logging.DEBUG,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
    else:
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s'
        )

def register_blueprints(app):
    """Register all blueprints"""
    from app.blueprints.api import bp as api_bp
    from app.blueprints.blockchain import bp as blockchain_bp
    
    app.register_blueprint(api_bp, url_prefix='/api')
    app.register_blueprint(blockchain_bp, url_prefix='/api/blockchain')
    
    app.logger.info("✅ Blueprints registered: api, blockchain")

def register_resources(api_instance):
    """Register all REST resources"""
    from app.resources.user_resources import (
        UserResource, UserListResource, UserLookupResource
    )
    from app.resources.user_profile_resources import (
        UserProfileResource, UserProfileListResource, UserProfileLookupResource
    )
    resources = [
        # User resources
        (UserListResource, "/users"),
        (UserResource, "/users/<string:user_id>"),
        (UserLookupResource, "/users/lookup"),
        
        # User Profile resources
        (UserProfileListResource, "/user-profiles"),
        (UserProfileResource, "/user-profiles/<string:profile_id>"),
        (UserProfileLookupResource, "/user-profiles/lookup"),
    ]

    
    # User resources
    for resource, route in resources:
        api_instance.add_resource(resource, route)

    logging.info(f"✅ Resources registered: {len(resources)} endpoints")

def register_error_handlers(app):
    """Register global error handlers"""
    @app.errorhandler(404)
    def not_found(error):
        app.logger.warning(f"404 Not Found: {request.path}")
        return jsonify({
            "error": "Resource not found",
            "path": request.path,
            "timestamp": datetime.utcnow().isoformat()
        }), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        app.logger.error(f"500 Internal Error: {str(error)}")
        return jsonify({
            "error": "Internal server error",
            "timestamp": datetime.utcnow().isoformat()
        }), 500

def init_database(app):
    """Initialize database with models"""
    # Import all models to ensure they are registered with SQLAlchemy
    from app.models import user, user_profile
    
    # Create tables
    db.create_all()
    app.logger.info("🗄️ Database tables initialized successfully")
    
    # Log registered models
    table_count = len(db.metadata.tables)
    app.logger.info(f"📊 Database models registered: {table_count} tables")

