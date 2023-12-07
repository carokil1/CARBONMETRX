// Function to handle user registration
export async function registerUser(userData) {
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      // Handle registration failure
      const errorData = await response.json();

      if (response.status === 400) {
        // Bad Request (e.g., validation error)
        throw new Error(errorData.message || 'Invalid registration data');
      } else {
        // Other types of errors (display the error message from the server)
        throw new Error(errorData.message || 'Registration failed');
      }
    }

    // Registration successful
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle any unexpected errors during registration
    console.error('Error during registration:', error.message);
    throw error;
  }
}

// Function to handle user login
export async function loginUser(userData) {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      // Handle login failure
      const errorData = await response.json();

      if (response.status === 401) {
        // Unauthorized (e.g., incorrect credentials)
        throw new Error('Invalid username or password');
      } else {
        // Other types of errors (display the error message from the server)
        throw new Error(errorData.message || 'Login failed');
      }
    }

    // Login successful
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle any unexpected errors during login
    console.error('Error during login:', error.message);
    throw error;
  }
}

// Function to handle user logout
export async function logoutUser() {
  try {
    const response = await fetch('/api/logout', {
      method: 'POST',
    });

    if (!response.ok) {
      // Handle logout failure
      const errorData = await response.json();
      throw new Error(errorData.message || 'Logout failed');
    }

    // Logout successful
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle any unexpected errors during logout
    console.error('Error during logout:', error.message);
    throw error;
  }
}

// Function to retrieve home data
export async function getHomeData() {
  try {
    const response = await fetch('/api/home');
    
    if (!response.ok) {
      // Handle error in fetching home data
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to retrieve home data');
    }

    // Data retrieval successful
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle any unexpected errors during home data retrieval
    console.error('Error during home data retrieval:', error.message);
    throw error;
  }
}