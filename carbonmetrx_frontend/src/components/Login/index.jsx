// src/components/Login.js
import React, { useState } from 'react';
import AuthenticatedDashboard from './AuthenticatedDashboard';
import AuthenticatedAnalytics from './AuthenticatedAnalytics';
import Userprofile from './Userprofile';
import Settings from './Settings';
import Notifications from './Notifications';
import Feedback from './Feedback';

/**
 * Component for the login page with conditional rendering of components.
 */
function Login() {
  // State to track authentication status
  const [isLoggedIn, setLoggedIn] = useState(false);

  /**
   * Function to handle login logic.
   */
  const handleLogin = () => {
    // Perform login logic, setLoggedIn(true) on successful login
  };

  
  return (
    <div>
      {isLoggedIn ? (
        // Render components after login
        <>
          <AuthenticatedDashboard />
          <AuthenticatedAnalytics />
          <Userprofile />
          <Settings />
          <Notifications />
          <Feedback />
        </>
      ) : (
        // Render login form when not logged in
        <>
          <h2>Login to Your CarbonMetrX Account</h2>
          {/* Your login form components */}
          <button className="login-button" onClick={handleLogin}>Login</button>
        </>
      )}
    </div>
  );
}

export default Login;