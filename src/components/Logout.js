// src/components/Logout.js
import React, { useContext } from "react";
import { AuthContext } from "./Auth";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory

const LogOut = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = async () => {
    try {
      logout(); // Call the logout function from context
      navigate("/"); // Redirect to the login page after logout
    } catch (error) {
      console.error(
        "Error during logout:",
        error.response?.data.error || error.message
      );
      // Handle error scenario, e.g., display an error message to the user
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <p>Are you sure you want to log out?</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh", // Adjust as needed
  },
  content: {
    textAlign: "center",
  },
};

export default LogOut;