// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';

// const ResetPassword = () => {
//     const location = useLocation();
//     const query = new URLSearchParams(location.search);
//     const token = query.get('token'); // Get the token from the URL

//     const [newPassword, setNewPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         setSuccess('');

//         // Basic validation
//         if (newPassword !== confirmPassword) {
//             setError("Passwords do not match.");
//             return;
//         }

//         try {
//             // Replace with your API endpoint
//             const response = await axios.post('http://localhost:3000/reset-password', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ token, newPassword }), // Include the token in the request
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to reset password. Please try again.');
//             }

//             const data = await response.json();
//             setSuccess(data.message || 'Password reset successfully!');
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     return (
//         <div >
//             <h2>Reset Your Password</h2>
//             <form onSubmit={handleSubmit}>
//                 <input 
//                     type="password" 
//                     placeholder="New Password" 
//                     value={newPassword} 
//                     onChange={(e) => setNewPassword(e.target.value)} 
//                     required 
//                 />
//                 <input 
//                     type="password" 
//                     placeholder="Confirm New Password" 
//                     value={confirmPassword} 
//                     onChange={(e) => setConfirmPassword(e.target.value)} 
//                     required 
//                 />
//                 <button type="submit">Reset Password</button>
//             </form>
//             {error && <p className="error">{error}</p>}
//             {success && <p className="success">{success}</p>}
//         </div>
//     );
// };

// export default ResetPassword;