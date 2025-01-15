import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AssignmentDetail = () => {
  const { id } = useParams(); // Get the assignment ID from the URL
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filePath, setFilePath] = useState(''); // State for the file path input

  // Fetch assignment details by ID
  const fetchAssignmentById = async () => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const response = await axios.get(`http://localhost:4000/api/getAssignmentById/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAssignment(response.data);
      setFilePath(response.data.file_path); // Set initial file path for the form
    } catch (err) {
      setError('Failed to fetch assignment details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Update assignment
  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const token = sessionStorage.getItem("accessToken");
      await axios.patch(`http://localhost:4000/api/updateAssignment/${id}`, { file_path: filePath }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Assignment updated successfully!');
      fetchAssignmentById(); // Refresh the assignment details
    } catch (err) {
      alert('Failed to update assignment.');
      console.error(err);
    }
  };
  useEffect(() => {
    fetchAssignmentById();
  }, [id]);

  if (loading) return <p>Loading assignment details...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="assignment-detail">
      <h2>Assignment Details</h2>
      <form onSubmit={handleUpdate}>
        <div >
          <label>ID:</label>
          <p>{assignment.id}</p>
        </div>
        <div>
          <label>File Path:</label>
          <input type="text"value={filePath}onChange={(e) => setFilePath(e.target.value)}/>
        </div>
        <div>
          <label>Uploaded By:</label>
          <p>{assignment.user?.email || 'N/A'}</p>
        </div>
        <div>
          <label>Uploaded At:</label>
          <p>{new Date(assignment.uploaded_at).toLocaleString()}</p>
        </div>
        <button type="submit">Update Assignment</button>
      </form>
    </div>
  );
};

export default AssignmentDetail;