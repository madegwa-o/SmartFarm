import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from './Login.module.css';

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Use useNavigate here

    const handleInputChange = (e) => {
        setUsername(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post('http://localhost:8080/api/login', { username });
            console.log('login response: ', response);
            if (response.status === 200) {
                // Assume the login is successful if status 200 is returned
                localStorage.setItem('userId', response.data.userId);
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('isLoggedIn', 'true');
                onLoginSuccess(response.data); // Pass data to parent component
                navigate("/dashboard"); // Navigate to dashboard after login
                window.location.reload()
            } else {
                setError('Login failed. Please try again.');
            }
        } catch (error) {
            setError('Login failed. Please check your username and try again.');
            console.error("Login error:", error);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default Login;
