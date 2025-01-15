import { useState, useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify"; 
import { AuthContext } from "./Auth"; 
import { useNavigate } from "react-router-dom"; 

const Login = () => {
    const { login, loading } = useContext(AuthContext); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    // Login user and handle redirection
    const loginUser = async (e) => {
        e.preventDefault();
      
        try {
          await login(email, password);
      
          toast.success("Login successful!", {
            position: "top-right",
            autoClose: 3000, 
          });
      
         
          setTimeout(() => {
            navigate("/AssignmentList");
          }, 3000); 
        } catch (error) {
        
          toast.error("Login failed! Please check your credentials.", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      };

    return (
        <div className="form-container">
            <form onSubmit={loginUser }>
                <h2 className="login">Sign In</h2>

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

                <div className="fb">
                    <button type="submit" disabled={loading}>Login</button>
                    <p className="pa">
                        <a href="/forgot-password">Forgot password?</a>
                    </p>
                    <p>
                        Don't have an account? <a href="/register">Register here</a>
                    </p>
                </div>
            </form>
            <ToastContainer /> 
        </div>
    );
};

export default Login;