import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Resources from './components/Resources';
import Emissions from './components/Emissions';
import Login from './components/Login';
import Register from './components/Register'; // Renamed Signup to Register
import AuthenticatedDashboard from './components/Login/AuthenticatedDashboard';
import AuthenticatedAnalytics from './components/Login/AuthenticatedAnalytics';
import Userprofile from './components/Login/Userprofile';
import Settings from './components/Login/Settings';
import Notifications from './components/Login/Notifications';
import Feedback from './components/Login/Feedback';

// Import CSS Files
import './styles/app.css'

function App() {
  return (
    <div className="container">
      <Router>
        <header>
          <div className="headline">
            <div className="column1">
              <nav>
                <Link to="/" className="home">Home</Link>
              </nav>
            </div>

            <div className="column2">
              <nav>
                <div><Link to="/features" className="features">Features</Link></div>
                <div><Link to="/pricing" className="pricing">Pricing</Link></div>
                <div><Link to="/resources" className="resources">Resources</Link></div>
                <div><Link to="/login" className="login">Login</Link></div>
                <div><Link to="/register" className="register">Register</Link></div> {/* Changed from Signup to Register */}
              </nav>
            </div>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/login" element={<Login />} />
          <Route path="/emissions" element={<Emissions />} />
          <Route path="/register" element={<Register />} /> {/* Changed from /signup to /register */}

          {/* Routes for Authenticated Components */}
          <Route path="/dashboard" element={<AuthenticatedDashboard />} />
          <Route path="/analytics" element={<AuthenticatedAnalytics />} />
          <Route path="/profile" element={<Userprofile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;