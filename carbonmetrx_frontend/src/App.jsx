// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, } from 'react-router-dom';
import Home from './components/Home';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Resources from './components/Resources';
import Login from './components/Login';
import Signup from './components/Signup';
import AuthenticatedDashboard from './components/Login/AuthenticatedDashboard';
import AuthenticatedAnalytics from './components/Login/AuthenticatedAnalytics';
import Userprofile from './components/Login/Userprofile';
import Settings from './components/Login/Settings';
import Notifications from './components/Login/Notifications';
import Feedback from './components/Login/Feedback';

/**
 * Main App component with routing.
 */
function App() {
  return (
    <div className="container">
      <Router>
        {/* Navigation Links */}
        <div className = "nav">
          <nav>
            <div className="home-flexbox"><Link to="/">Home</Link></div> {/* Left flexbox with "CarbonMetrX" */}
            <div className="right-flexbox">
              <div className="features"><Link to="/features">Features</Link></div>
              <div className="pricing"><Link to="/pricing">Pricing</Link></div>
              <div className="resources"><Link to="/resources">Resources</Link></div>
              <div className="login"><Link to="/login">Login</Link></div>
              <div className="signup"><Link to="/signup">Sign Up</Link></div>
            </div>
          </nav>
        </div>

        {/* Route Switch */}
        <Routes>
          {/* Routes for Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Routes for Authenticated Components */}
            <Route path="/dashboard" element={<AuthenticatedDashboard />} />
            <Route path="/analytics" element={<AuthenticatedAnalytics />} />
            <Route path="/profile" element={<Userprofile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/feedback" element={<Feedback />} />
            
          {/* Add more routes and components as needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;