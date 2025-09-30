from flask import Blueprint, jsonify

from app.models import User

bp = Blueprint('api', __name__)

@bp.route('/health', methods=['GET'])
def health_check():
    return {"status": "healthy", "message": "Blue Carbon API is running"}

@bp.route('/stats', methods=['GET'])
def get_stats():
    """Get API statistics"""
    # Import here to avoid circular imports
    # from app. import User, Project, CarbonCredit, Transaction
    
    stats = {
        "total_users": User.query.count(),
        # "total_projects": Project.query.count(),
        # "total_credits": CarbonCredit.query.count(),
        # "total_transactions": Transaction.query.count()
    }
    return jsonify(stats)