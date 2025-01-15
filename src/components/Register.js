import { useState, useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify"; 
import { AuthContext } from "./Auth"; 
import { useNavigate } from "react-router-dom"; 

const Register = () => {
    const { register, loading } = useContext(AuthContext); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate(); 

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);

    const registerUser  = async (e) => {
        e.preventDefault();
    
        // Check if passwords match
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }
    
        try {
            // Call Register function
            await register(email, password); // Ensure this line is correct
            // If registration is successful, show success toast and navigate to login
            toast.success("Registration successful! Redirecting to login...", {
                position: "top-right",
                autoClose: 3000,
            });
            navigate("/"); // Redirect to login page
        } catch (error) {
            // If registration fails, show error toast
            toast.error(error.message || "Registration failed! Please try again.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={registerUser }>
                <h2 className="register">Register</h2>

                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        onChange={handleEmail}
                        required
                    />
                </div>

                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        onChange={handlePassword}
                        required
                    />
                </div>

                <div>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        onChange={handleConfirmPassword}
                        required
                    />
                </div>

                <div className="fb">
                    <button type="submit" disabled={loading}>Register</button>
                    
                </div>
            </form>
            <ToastContainer /> {/* Add ToastContainer to render the toasts */}
        </div>
    );
};

export default Register;