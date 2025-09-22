import os
import sys

try:
    from app import create_app
    
    print("🚀 Initializing Blue Carbon API...")
    print("=" * 60)
    
    app = create_app()

    if __name__ == '__main__':
        print("\n" + "=" * 60)
        print("🌟 BLUE CARBON API STARTUP COMPLETE")
        print("=" * 60)
        print(f"📊 Database: {app.config.get('SQLALCHEMY_DATABASE_URI')}")
        print(f"🐛 Debug mode: {app.config.get('DEBUG')}")
        print(f"🔑 Secret key configured: {'Yes' if app.config.get('SECRET_KEY') else 'No'}")
        print("🌐 Server starting at http://localhost:5000")
        print("\n📋 Available Endpoints:")
        print("-" * 40)
        
        # Print all registered routes
        with app.app_context():
            for rule in app.url_map.iter_rules():
                methods = ','.join(sorted(rule.methods - {'HEAD', 'OPTIONS'}))
                print(f"  {methods:10} {rule.rule}")
        
        print("-" * 40)
        print("🎯 Ready to accept requests!")
        print("=" * 60)
        
        app.run(debug=True, host='0.0.0.0', port=5000)
        
except ImportError as e:
    print(f"❌ Import Error: {e}")
    print("Make sure all dependencies are installed: pip install -r requirements.txt")
    sys.exit(1)
except Exception as e:
    print(f"❌ Application Error: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)