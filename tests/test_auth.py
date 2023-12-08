import unittest
from app import create_app, db
from app.models import User

class AuthTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.app.config['TESTING'] = True
        self.app_context = self.app.app_context()
        self.app_context.push()
        self.client = self.app.test_client()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_user_registration(self):
        response = self.client.post('/register', data={
            'username': 'newuser',
            'email': 'newuser@example.com',
            'password': 'password123',
            'confirm_password': 'password123'
        }, follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Account created successfully!', response.data)
        user = User.query.filter_by(username='newuser').first()
        self.assertIsNotNone(user)

    def test_user_login(self):
        user = User(username='testuser', email='test@example.com')
        user.set_password('testpassword')
        db.session.add(user)
        db.session.commit()

        response = self.client.post('/login', data={
            'email': 'test@example.com',
            'password': 'testpassword'
        }, follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Hello, CarbonMetrX!', response.data)

    def test_logout(self):
        user = User(username='testuser2', email='test2@example.com')
        user.set_password('testpassword2')
        db.session.add(user)
        db.session.commit()

        self.client.post('/login', data={
            'email': 'test2@example.com',
            'password': 'testpassword2'
        }, follow_redirects=True)

        response = self.client.get('/logout', follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        self.assertNotIn(b'Hello, CarbonMetrX!', response.data)

if __name__ == '__main__':
    unittest.main()
