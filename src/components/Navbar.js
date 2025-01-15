import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
     <h2> Dashboard</h2>

      <div className="navbar-container">
        <Link to="/upload" className="navbar-link">UploadAssignment</Link>
        <Link to="/assignmentlist" className="navbar-link">AssignmentList</Link>
        <Link to="/generatereport" className="navbar-link">GenerateReport</Link>

        <Link to="/logout" className="navbar-link">Logout</Link> {/* Logout link */}
      </div>
    </nav>
  );
};

export default Navbar;