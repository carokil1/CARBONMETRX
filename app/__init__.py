from flask import Flask
# from . import routes
from flask_sqlalchemy import SQLAlchemy
# from . import models 
from flask_login import LoginManager
from flask_cors import CORS 
from config import Config  # Importing Config from the root level

db = SQLAlchemy()  # Create the SQLAlchemy object
login_manager = LoginManager()
login_manager.login_view = 'main.login'

def create_app():
    app = Flask(__name__)

    # config and extensions setup

    app.config.from_object(Config)  # Load configuration from Config class

    db.init_app(app)  # Initialize SQLAlchemy with the Flask app
    login_manager.init_app(app)
    # Initialize CORS
    CORS(app)
        
    # Import models and routes
    from . import models, routes
    
    # Create database tables within app context
    with app.app_context():
        db.create_all()
        
          
    
    # with app.app_context():
      #  db.create_all()

    # importing and registering routes

    
    app.register_blueprint(routes.bp)
    return app
