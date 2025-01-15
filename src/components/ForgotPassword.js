import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            // Update the URL to match your server's route
            await axios.post('http://localhost:3000/api/request-password-reset', { email });
            setMessage('Password reset email sent! Please check your inbox.');
        } catch (error) {
            setMessage('Error sending password reset email. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <h2 className='login'>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email Address:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Reset Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ForgotPassword;