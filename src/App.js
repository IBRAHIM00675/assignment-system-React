import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./components/Auth"; 
import Login from "./components/Login"; 
import Register from "./components/Register";
import LogOut from "./components/Logout"; 
import Navbar from "./components/Navbar"; 
import UploadAssignment from "./components/UploadAssignment";
import AssignmentList from "./components/AssignmentList";
import GenerateReport from "./components/GenerateReport";
import AssignmentDetail from "./components/AssignmentDetails";

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="App">
      {isAuthenticated && <Navbar />}

      <div className="content">
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/register" element={<Register />} /> 
          <Route path="/logout" element={<LogOut />} /> 
          <Route path="/upload" element={<UploadAssignment />} /> 
          <Route path="/assignmentlist" element={<AssignmentList />} /> 
          <Route path="/generatereport" element={<GenerateReport/>} />
          <Route path="/assignmentdetail/:id" element={<AssignmentDetail />} />



        </Routes>
      </div>
    </div>
  );
}

export default App;