
// useAuth.js
import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Set loading to true on component mount

  useEffect(() => {
    // Get the token from localStorage to check if the user is authenticated
    const token = localStorage.getItem('token'); // Assuming you store the JWT token in localStorage

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    setIsLoading(false); // Set loading to false after the check
  }, []);

  return { isAuthenticated, isLoading };
};

export default useAuth;
