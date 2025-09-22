from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api

# Initialize extensions
db = SQLAlchemy()

def create_app(config_class='config.Config'):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize extensions with app
    db.init_app(app)
    
    # Initialize Flask-RESTful AFTER app context
    api = Api(app)
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return {"error": "Resource not found"}, 404
    
    @app.route('/')
    def home():
        return {
            "status": "healthy",
            "message": "Welcome to the Blue Carbon Project API"
        }
    
    print("\n🏠 Registering Core Routes:")
    print("=" * 50)
    print("✅ GET / -> Welcome page")
    print("✅ Error Handler 404 -> Not found handler")
    
    # Import and register after app context is set
    with app.app_context():
        # Import models after db is initialized
        from app import models
        print("\n📊 Database Models Imported:")
        print("=" * 50)
        model_classes = [cls for cls in dir(models) if isinstance(getattr(models, cls), type) and hasattr(getattr(models, cls), '__tablename__')]
        for model_name in model_classes:
            model_class = getattr(models, model_name)
            if hasattr(model_class, '__tablename__'):
                print(f"✅ {model_name} -> Table: {model_class.__tablename__}")
        
        # Create tables
        db.create_all()
        print(f"\n🗄️  Database tables created/verified!")
        
        # Register blueprints
        from app.routes import bp as api_bp
        app.register_blueprint(api_bp, url_prefix='/api')
        print(f"\n🛣️  Registering Blueprint Routes:")
        print("=" * 50)
        print("✅ GET /api/health -> Health check")
        print("✅ GET /api/stats -> API statistics")
        
        # Register resources
        print("\n🔄 About to register Flask-RESTful resources...")
        try:
            from app.resources import register_resources, UserListResource, UserResource, ProjectListResource, ProjectResource
            print("✅ Successfully imported resource classes:")
            print(f"   - UserListResource: {UserListResource}")
            print(f"   - UserResource: {UserResource}")  
            print(f"   - ProjectListResource: {ProjectListResource}")
            print(f"   - ProjectResource: {ProjectResource}")
            
            register_resources(api)
            print("✅ Flask-RESTful resources registration completed!")
        except ImportError as e:
            print(f"❌ Import Error for resources: {e}")
            import traceback
            traceback.print_exc()
        except Exception as e:
            print(f"❌ Error registering resources: {e}")
            import traceback
            traceback.print_exc()
    
    print("\n🔍 Final App Configuration:")
    print("=" * 50)
    print(f"📱 Flask-RESTful API initialized: {api is not None}")
    print(f"🗄️ SQLAlchemy DB initialized: {db is not None}")
    print(f"📝 Total URL rules: {len(list(app.url_map.iter_rules()))}")
    
    # Debug: Print all URL rules to see what's actually registered
    print("\n🔍 All Registered URL Rules:")
    print("-" * 50)
    for rule in app.url_map.iter_rules():
        methods = ','.join(sorted(rule.methods - {'HEAD', 'OPTIONS'}))
        print(f"  {methods:15} {rule.rule:25} -> {rule.endpoint}")
    print("-" * 50)
    
    return app