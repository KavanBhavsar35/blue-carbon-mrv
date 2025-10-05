import os
import sys
import logging
from datetime import datetime

# Add the backend directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    from app import create_app
    # from app.blockchain import initialize_blockchain_connection
    
    print("\n" + "="*70)
    print("🚀 BLUE CARBON MRV SYSTEM - STARTUP INITIATED")
    print("="*70)
    
    # Create application
    app = create_app()
    # Startup diagnostics
    with app.app_context():
        print(f"📦 Application Configuration:")
        print(f"   Environment: {'DEVELOPMENT' if app.config['DEBUG'] else 'PRODUCTION'}")
        # print(f"   Database: {app.config['SQLALCHEMY_DATABASE_URI'].split('@')[-1] if '@' in app.config['SQLALCHEMY_DATABASE_URI'] else 'SQLite'}")
        print(f"   Database: {app.config['SQLALCHEMY_DATABASE_URI'] if '@' in app.config['SQLALCHEMY_DATABASE_URI'] else 'SQLite'}")
        print(f"   Debug Mode: {app.config['DEBUG']}")
        
        # Count registered routes
        routes = list(app.url_map.iter_rules())
        api_routes = [r for r in routes if r.rule.startswith('/api')]
        
        print(f"\n🌐 API Endpoints Summary:")
        print(f"   Total Routes: {len(routes)}")
        print(f"   API Routes: {len(api_routes)}")
        
        # Blockchain initialization
        # print(f"\n🔗 Blockchain Initialization:")
        # if initialize_blockchain_connection():
        #     print("   ✅ Blockchain connection established")
        # else:
        #     print("   ⚠️  Blockchain connection failed - running in offline mode")
        
        print(f"\n📋 Available API Endpoints:")
        print("-" * 50)
        for rule in sorted(api_routes, key=lambda x: x.rule):
            methods = ','.join(sorted([m for m in rule.methods if m not in ['OPTIONS', 'HEAD']]))
            print(f"   {methods:15} {rule.rule}")
        
        print("-" * 50)
        print(f"🕒 Server started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("🎯 Ready to accept requests at: http://localhost:5000")
        print("="*70 + "\n")
    
    if __name__ == '__main__':
        app.run(debug=app.config['DEBUG'], host='0.0.0.0', port=5000)
        
except ImportError as e:
    print(f"❌ CRITICAL: Import error - {e}")
    print("Please check your dependencies and Python path")
    sys.exit(1)
except Exception as e:
    print(f"❌ CRITICAL: Application failed to start - {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)