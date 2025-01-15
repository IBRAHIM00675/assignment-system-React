import React, { useState } from 'react';
import axios from 'axios';

const SearchAssignments = ({ setFilteredAssignments }) => {
  const [uploadedAt, setUploadedAt] = useState('');

  const handleSearch = async () => {
    try {
      const token = sessionStorage.getItem('accessToken'); // Get token for authentication
      const response = await axios.get('http://localhost:4000/api/search', {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          uploaded_at: uploadedAt, // Send the full datetime query parameter
        },
      });

      // Set the filtered assignments based on the search results
      setFilteredAssignments(response.data);
    } catch (error) {
      console.error('Error searching assignments:', error);
      setFilteredAssignments([]); // Clear results in case of an error
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text" // User can manually enter the date-time string
        value={uploadedAt}
        onChange={(e) => setUploadedAt(e.target.value)} // Update uploaded date-time with user input
        placeholder="Enter upload date and time (e.g., 2024-12-28T10:49:02)"
      />
      <button onClick={handleSearch}>Search</button> {/* Trigger the search */}
    </div>
  );
};

export default SearchAssignments;
