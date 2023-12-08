import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Resources from './components/Resources';
import Login from './components/Login';
import Register from './components/Register'; // Renamed Signup to Register
import AuthenticatedDashboard from './components/Login/AuthenticatedDashboard';
import AuthenticatedAnalytics from './components/Login/AuthenticatedAnalytics';
import Userprofile from './components/Login/Userprofile';
import Settings from './components/Login/Settings';
import Notifications from './components/Login/Notifications';
import Feedback from './components/Login/Feedback';

function App() {
  return (
    <div className="container">
      <Router>
        <div className = "nav">
          <nav>
            <div className="home-flexbox"><Link to="/">landing page</Link></div>
            <div className="right-flexbox">
              <div className="features"><Link to="/features">Features</Link></div>
              <div className="pricing"><Link to="/pricing">Pricing</Link></div>
              <div className="resources"><Link to="/resources">Resources</Link></div>
              <div className="login"><Link to="/login">Login</Link></div>
              <div className="register"><Link to="/register">Register</Link></div> {/* Changed from Signup to Register */}
            </div>
          </nav>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/login" element={<Login />} />
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
