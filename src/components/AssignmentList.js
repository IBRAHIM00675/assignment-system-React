import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchAssignments from './SearchAssignment';

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [role, setRole] = useState(''); 
  const navigate = useNavigate(); 

  // Fetch assignments from the backend
  const fetchAssignments = async () => {
    try {
      const token = sessionStorage.getItem("accessToken"); 

      if (!token) {
        setError('You are not authenticated. Please log in.');
        setLoading(false);
        return;
      }

      // Decode the token to get the user's role
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setRole(decodedToken.role); // Set the user's role

      // Determine the endpoint based on the user's role
      const endpoint = decodedToken.role === 'admin' ? '/getAllAssignments' : '/getUserAssignments';

      const response = await axios.get(`http://localhost:4000/api${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAssignments(response.data);
      setFilteredAssignments(response.data);  // Initialize filtered list

      setLoading(false);
    } catch (err) {
      setError('Failed to fetch assignments. Please try again later.');
      setLoading(false);
    }
  };



  // Handle updating an assignment
  const handleUpdateAssignment = (id) => {
    navigate(`/assignmentdetail/${id}`); // Navigate to the AssignmentDetail component with the assignment ID
  };

  // Handle deleting an assignment
  const handleDeleteAssignment = async (id) => {
    const confirmation = window.confirm('Are you sure you want to delete this assignment?');
    if (!confirmation) return;

    try {
      const token = sessionStorage.getItem("accessToken");
      await axios.delete(`http://localhost:4000/api/deleteAssignment/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Assignment deleted successfully!');
      fetchAssignments(); // Refresh the assignments list
    } catch (err) {
      alert('Failed to delete assignment. Please try again later.');
    }
  };

  // Fetch assignments when the component mounts
  useEffect(() => {
    fetchAssignments();
  }, []);

  if (loading) {
    return <p>Loading assignments...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div className='assignment-list'>
      <h2>{role === 'admin' ? 'All Assignments' : 'My Assignments'}</h2>
      <SearchAssignments setFilteredAssignments={setFilteredAssignments} />  {/* Pass the function here */}

      {assignments.length === 0 ? (
        <p>No assignments found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>File Path</th>
              <th>Uploaded By</th>
              <th>Uploaded At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td>{assignment.id}</td>
                <td>{assignment.file_path}</td>
                <td>{assignment.user?.email || 'N/A'}</td>
                <td>{new Date(assignment.uploaded_at).toLocaleString()}</td>
                <td>
                  {role === 'admin' && (
                    <>
                      <button onClick={() => handleUpdateAssignment(assignment.id)}>Edit</button>
                      <button className="delete-button" onClick={() => handleDeleteAssignment(assignment.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AssignmentList;