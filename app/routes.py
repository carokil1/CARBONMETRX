from flask import Blueprint, request, jsonify, current_app as app
from .models import User, db, EmissionsData
from flask_login import login_user, logout_user, current_user, login_required
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

# Add a new route to handle emissions data submission
@bp.route('/api/emissions', methods=['POST'])
@login_required
def submit_emissions():
    try:
        data = request.json

        # Validate and process emissions data here
        if 'source' not in data or 'amount' not in data or 'unit' not in data:
            return jsonify({"message": "Missing required fields"}), 400
        # Example: Create a new EmissionsData instance and store it in the database
        new_emissions_data = EmissionsData(
            user_id=current_user.id,
            source=data['source'],
            amount=data['amount'],
            unit=data['unit'],
            # Add other fields as needed
        )

        db.session.add(new_emissions_data)
        db.session.commit()
        return jsonify({"message": "Emissions data submitted successfully"}), 201

    except SQLAlchemyError as e:
        # Handle database errors
        db.session.rollback()
        return jsonify({"message": "Emissions data submission failed due to a database error"}), 500
    except Exception as e:
        # Handle any other exceptions
        return jsonify({"message": "Internal Server Error"}), 500

# Add a new route to retrieve emissions data
@bp.route('/api/emissions', methods=['GET'])
@login_required
def get_emissions():
    try:
        # Query database for emissions data (adjust this based on your database model)
        emissions_data = EmissionsData.query.filter_by(user_id=current_user.id).all()

        # Serialize emissions data into a format suitable for JSON response
        emissions_data_json = [
            {
                "source": entry.source,
                "amount": entry.amount,
                "unit": entry.unit,
                # Add other fields as needed
            }
            for entry in emissions_data
        ]

        return jsonify(emissions_data_json), 200

    except SQLAlchemyError as e:
        # Handle database errors
        return jsonify({"message": "Failed to retrieve emissions data due to a database error"}), 500
    except Exception as e:
        # Handle any other exceptions
        return jsonify({"message": "Internal Server Error"}), 500
    
@bp.route('/api/emissions/<int:emissions_id>', methods=['PUT'])
@login_required
def update_emissions(emissions_id):
    data = request.json
    emissions = EmissionsData.query.get(emissions_id)

    if emissions is None or emissions.user_id != current_user.id:
        return jsonify({"error": "Emissions record not found or access denied"}), 404

    try:
        emissions.source = data.get('source', emissions.source)
        emissions.amount = data.get('amount', emissions.amount)
        emissions.unit = data.get('unit', emissions.unit)
        # Update other fields as necessary

        db.session.commit()
        return jsonify({"message": "Emissions data updated successfully"}), 200

    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": "Database error"}), 500

@bp.route('/api/emissions/<int:emissions_id>', methods=['DELETE'])
@login_required
def delete_emissions(emissions_id):
    emissions = EmissionsData.query.get(emissions_id)

    if emissions is None or emissions.user_id != current_user.id:
        return jsonify({"error": "Emissions record not found or access denied"}), 404

    try:
        db.session.delete(emissions)
        db.session.commit()
        return jsonify({"message": "Emissions data deleted successfully"}), 200

    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": "Database error"}), 500

@bp.route('/api/emissions/filter', methods=['GET'])
@login_required
def filter_emissions():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    source = request.args.get('source')

    query = EmissionsData.query.filter(EmissionsData.user_id == current_user.id)
    if start_date:
        query = query.filter(EmissionsData.timestamp >= start_date)
    if end_date:
        query = query.filter(EmissionsData.timestamp <= end_date)
    if source:
        query = query.filter(EmissionsData.source == source)

    filtered_emissions = query.all()
    emissions_data_json = [
        {"source": e.source, "amount": e.amount, "unit": e.unit, "timestamp": e.timestamp}
        for e in filtered_emissions
    ]

    return jsonify(emissions_data_json), 200

