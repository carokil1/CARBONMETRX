from flask import Blueprint, render_template, redirect, url_for, flash, current_app as app
from flask_login import login_user, logout_user, current_user
from .forms import RegistrationForm, LoginForm
from .models import User, db

bp = Blueprint('main', __name__)

@bp.route('/')
def home():
    return app.send_static_file('dist/index.html')

@bp.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))

    form = RegistrationForm()
    if form.validate_on_submit():
        print("Form validated and submitted")  # Debugging
        try:
            user = User(username=form.username.data, email=form.email.data)
            user.set_password(form.password.data)
            db.session.add(user)
            db.session.commit()
            flash('Account created successfully!', 'success')
            return redirect(url_for('main.login'))
        except Exception as e:
            print(f"Error: {e}")  # Log the error for debugging
            db.session.rollback()  # Rollback in case of error
    else:
        print("Form not validated")  # Debugging
        # New debugging code to print form errors
        for fieldName, errorMessages in form.errors.items():
            for err in errorMessages:
                print(f"{fieldName}: {err}")
                
    return render_template('register.html', form=form)

@bp.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))

    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password', 'danger')
            return redirect(url_for('main.login'))

        login_user(user, remember=form.remember.data)
        return redirect(url_for('main.home'))

    return render_template('login.html', form=form)

@bp.route('/logout')
def logout():
    logout_user()
    flash('You have been logged out.', 'info')
    return redirect(url_for('main.home'))

""" @bp.route('/init_db')
def init_db():
    db.create_all()
    return "Database tables created." """