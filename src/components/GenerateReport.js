import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './Auth';
import Papa from 'papaparse';

const GenerateReport = () => {
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      setError('User is not authenticated');
      navigate('/login');
      return;
    }

    const token = sessionStorage.getItem('accessToken');

    if (!token) {
      setError('No token found in session storage');
      navigate('/login');
      return;
    }

    axios.get('http://localhost:4000/api/generate-report', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('API Response:', response.data); // Log the response

      // Parse the CSV string into an array of objects
      const parsedData = Papa.parse(response.data, {
        header: true, // Use the first row as keys
        skipEmptyLines: true, // Skip empty lines
      });

      console.log('Parsed Data:', parsedData.data); // Log the parsed data

      // Set the parsed data to the state
      setAssignments(parsedData.data);
      setError(null);
    })
    .catch(error => {
      console.error('Error fetching assignments:', error);
      setError('Failed to fetch assignments. Please try again.');
      setAssignments([]); // Set assignments to an empty array on error
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    });
  }, [isAuthenticated, navigate]);

  const backendBaseUrl = 'http://localhost:4000';

  return (
    <div className='assignment-list'>
      <h1>Assignment Report</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Assignment ID</th>
            <th>User Email</th>
            <th>File Path</th>
            <th>Uploaded At</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(assignments) && assignments.length > 0 ? (
            assignments.map((assignment, index) => (
              <tr key={index}>
                <td>{assignment['Assignment ID']}</td>
                <td>{assignment['User Email']}</td>
                <td>
                  <a href={`${backendBaseUrl}/${assignment['File Path']}`} target="_blank" rel="noopener noreferrer">
                    {assignment['File Path']}
                  </a>
                </td>
                <td>{assignment['Uploaded At']}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No assignments found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GenerateReport;