import os


class Config:
    """Configuration settings for the Flask application."""

    SECRET_KEY = ('938edcbacc7e565ea0984a2c93ba07d263d76fa6eb73abe0'
                  # to be changed to a random key
                  )
    SQLALCHEMY_DATABASE_URI = 'sqlite:///site.db'
    # SQLALCHEMY_DATABASE_URI = (
        #'mysql+mysqlconnector://carokil:NYangige11!!@localhost/carbonmetrx_db'
    #)
    SQLALCHEMY_TRACK_MODIFICATIONS = False    # Disable modification tracking
    DEBUG = True  # Set to False in production
