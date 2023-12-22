// src/components/Login.jsx
import React, { useState } from 'react';
import AuthenticatedDashboard from './AuthenticatedDashboard';
import AuthenticatedAnalytics from './AuthenticatedAnalytics';
import Userprofile from './Userprofile';
import Settings from './Settings';
import Notifications from './Notifications';
import Feedback from './Feedback';

function Login() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!loginData.email) tempErrors.email = 'Email is required.';
    if (!loginData.password) tempErrors.password = 'Password is required.';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    // Perform login logic and setLoggedIn(true) on successful login
    // For example:
    // await api.post('/login', loginData);
    setLoggedIn(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin();
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
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              />
              {errors.password && <div className="error">{errors.password}</div>}
            </div>
            <button type="submit">Login</button>
          </form>
        </>
      )}
    </div>
  );
}

export default Login;