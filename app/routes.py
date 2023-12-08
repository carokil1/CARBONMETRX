from flask import Blueprint, request, jsonify, current_app as app
from .models import User, db
from flask_login import login_user, logout_user, current_user
from sqlalchemy.exc import SQLAlchemyError

bp = Blueprint('main', __name__)

@bp.route('/')
def index():
    return app.send_static_file('index.html')
 

@bp.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.json
        # Check if the user already exists in the database
        if User.query.filter_by(email=data['email']).first():
            return jsonify({"message": "Email already registered"}), 400

        # Create a new user instance
        new_user = User(username=data['username'], email=data['email'])
        new_user.set_password(data['password'])  # Hash the password
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "Registration successful"}), 201

    except SQLAlchemyError as e:
        # Handle database errors
        db.session.rollback()
        return jsonify({"message": "Registration failed due to a database error"}), 500
    except Exception as e:
        # Handle any other exceptions
        return jsonify({"message": "Internal Server Error"}), 500

@bp.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.json
        user = User.query.filter_by(email=data['email']).first()
        # Check user credentials
        if user and user.check_password(data['password']):
            login_user(user)  # Log in the user if credentials are valid
            return jsonify({"message": "Login successful"}), 200
        else:
            return jsonify({"message": "Invalid email or password"}), 401
    except Exception as e:
        # Handle any unexpected exceptions
        return jsonify({"message": "Internal Server Error"}), 500

@bp.route('/api/logout', methods=['POST'])
def logout():
    try:
        logout_user()  # Log out the current user
        return jsonify({"message": "Logout successful"}), 200
    except Exception as e:
        # Handle any unexpected exceptions
        return jsonify({"message": "Internal Server Error"}), 500

# ... Additional routes ...
