import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadAssignment = () => {
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [assignmentName, setAssignmentName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAssignmentFile(file);
  };

  const handleNameChange = (event) => {
    setAssignmentName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!assignmentFile || !assignmentName) {
      toast.error('Please fill all fields');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', assignmentFile);
    formData.append('assignmentName', assignmentName);

    // Log the form data for debugging
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const token = sessionStorage.getItem('accessToken');
      const response = await axios.post('http://localhost:4000/api/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });
      setIsLoading(false);
      toast.success('Assignment uploaded successfully!');
      console.log(response.data);
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        // Backend returned an error response
        toast.error(error.response.data.message || 'Failed to upload assignment. Please try again.');
      } else {
        // Network or other errors
        toast.error('Failed to upload assignment. Please try again.');
      }
      console.error('Upload error:', error);
    }
  };

  return (
    <div className='form-container'>
      <h2>Upload Assignment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="assignmentFile">Assignment File:</label>
          <input
            type="file"
            id="assignmentFile"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            required
          />
        </div>
        <div>
          <label htmlFor="assignmentName">Assignment Name:</label>
          <input
            type="text"
            id="assignmentName"
            value={assignmentName}
            onChange={handleNameChange}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UploadAssignment;