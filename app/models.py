# models.py
from . import db, login_manager
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(db.Model):
    """
User model representing a user in the system.

Attributes:
    id (int): The unique identifier of the user.
    username (str): The username of the user.
    email (str): The email address of the user.
    password_hash (str): The hashed password of the user.

Methods:
    set_password(password): Set the password hash for the user.
    check_password(password): Check if the provided password matches the stored password hash.

Args:
    password: The password to be hashed and stored (for set_password method).
    password: The password to be checked against the stored password hash (for check_password method).

Returns:
    None (for set_password method).
    bool: True if the provided password matches the stored password hash, False otherwise (for check_password method).
"""

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    # Add a back reference to the emissions data associated with this user
    emissions_data = db.relationship('EmissionsData', back_populates='user')
class EmissionsData(db.Model):
    """
    EmissionsData model representing emissions data in the system.

    Attributes:
        id (int): The unique identifier of the emissions data.
        source (str): The source of emissions data.
        amount (float): The amount of emissions data.
        unit (str): The unit of emissions data.
        timestamp (datetime): The timestamp of when the emissions data was recorded.
        user_id (int): The foreign key referencing the user associated with the emissions data.
    """
    id = db.Column(db.Integer, primary_key=True)
    source = db.Column(db.String(255))
    amount = db.Column(db.Float)
    unit = db.Column(db.String(50))
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
   
    # Defining a reference to the User object associated with this emissions data
    user = db.relationship('User', back_populates='emissions_data')
 