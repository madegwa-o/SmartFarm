// src/components/Header.jsx
import {useState}from 'react';
import styles from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import {LoginContext} from "../../App.jsx";


const Header = ({ onLogout }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(LoginContext);

    return (
        <header className={styles.header}>
            <h1>GreenCup Dashboard</h1>
            <nav className={styles.nav}>
                {isLoggedIn ? (
                    <button className={styles.logoutButton} onClick={onLogout}>Logout</button>
                ):(
                    <Link to="/login">Login</Link>
                )}
            </nav>
        </header>
    );
};

export default Header;
