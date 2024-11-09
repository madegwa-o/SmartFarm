// src/components/login/Login.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setUsername(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post(`${BASE_URL}/api/login`, { username });
            if (response.status === 200) {
                localStorage.setItem('userId', response.data.userId);
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('isLoggedIn', 'true');
                onLoginSuccess(response.data);
                navigate("/dashboard");
                window.location.reload();
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
            <h2>Welcome Back</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleInputChange}
                    placeholder="Enter your username"
                    required
                />
                <button type="submit">Login</button>
            </form>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
};

export default Login;
