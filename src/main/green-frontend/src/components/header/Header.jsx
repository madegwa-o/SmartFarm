// src/components/Header.jsx
import { useContext } from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { LoginContext } from "../../App";

import cupImage from '../../images/cup.png';

const Header = ({ onLogout }) => {
    const [isLoggedIn] = useContext(LoginContext);

    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <h1 className={styles.logoText}>
                    Green <img src={cupImage} alt="GreenCup logo" className={styles.logoImage} />
                </h1>
            </div>
            <nav className={styles.nav}>
                <Link to="/" className={styles.navLink}>Home</Link>
                <Link to="/contact" className={styles.navLink}>Contact</Link>
                {isLoggedIn ? (
                    <button className={styles.logoutButton} onClick={onLogout}>Logout</button>
                ) : (
                    <Link to="/login" className={styles.loginButton}>Login</Link>
                )}
            </nav>
        </header>
    );
};

export default Header;
