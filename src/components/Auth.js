import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import "react-toastify/dist/ReactToastify.css";

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate(); 

  // Login function
  const login = async (email, password) => {
    setLoading(true); 
    setError(null);
  
    try {
      const response = await axios.post("http://localhost:4000/api/login", {
        email,
        password,
      });
  
      const token = response.data.accessToken; // Get the token from the response
      console.log('Token received:', token); // Debugging: Verify the token is received
  
      if (typeof token === "string") {
        setIsAuthenticated(true); // Set authenticated to true
        sessionStorage.setItem("accessToken", token); // Save token in sessionStorage
        console.log('Token stored:', sessionStorage.getItem("accessToken")); // Debugging: Verify the token is stored
        navigate("/AssignmentList"); // Redirect to dashboard after successful login
      } else {
        setError("Login failed: No token received.");
        throw new Error("Login failed: No token received.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed: An error occurred.");
      throw err; // Re-throw the error for the Login component to handle
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const register = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
        console.log('Registering user:', { email, password }); // Debugging statement
        const response = await axios.post("http://localhost:4000/api/register", { email, password });
        
        // Log the API response for debugging
        console.log('API response:', response.data);

        // Check if the response has a success property
        if (response.data && response.data.success) {
            return response.data; // Return the response data for further handling
        } else {
            // Handle unexpected response structure
            const errorMessage = response.data?.message || "Registration failed: Unexpected response structure.";
            setError(errorMessage);
        }
    } catch (err) {
        // Handle errors and set the error state
        const errorMessage = err.response?.data?.message || "Registration failed: An error occurred.";
        setError(errorMessage);
        console.error("Registration error:", err); // Log the error for debugging
    } finally {
        setLoading(false);
    }
};

  // Logout function
  const logout = () => {
    setIsAuthenticated(false); // Set authenticated to false
    sessionStorage.removeItem("accessToken"); // Remove token from sessionStorage
    navigate("/login"); // Redirect to login page after logout
  };

  // Check if the user is authenticated on initial load
  const checkAuth = () => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true); // Set authenticated to true if token exists
    }
  };

  // Call checkAuth when the component mounts
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};