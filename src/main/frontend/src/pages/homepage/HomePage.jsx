import React from 'react';
import styles from './HomePage.module.css';
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <h1 className={styles.tagline}>Empowering Sustainable Tea Farming</h1>
                <p className={styles.subtitle}>
                    Accurate data solutions for better productivity and resource management.
                </p>
                <button
                    onClick={() => navigate("/login")}
                    className={styles.ctaButton}
                >
                    Sign in
                </button>
            </section>

            {/* About Us Section */}
            <section className={styles.section} id="about">
                <h2>About Us</h2>
                <p>Greencup is committed to providing accurate and sustainable solutions for tea farmers and processors.</p>
            </section>

            {/* Features Section */}
            <section className={styles.section} id="features">
                <h2>Features</h2>
                <ul>
                    <li>Farm area calculation using Google Maps API</li>
                    <li>Yield estimation based on accurate data</li>
                    <li>Real-time productivity monitoring</li>
                </ul>
            </section>

            {/* Contact Section */}
            <section className={styles.section} id="contact">
                <h2>Contact Us</h2>
                <p>Email: contact@greencup.com</p>
                <p>Phone: +123 456 7890</p>

                {/* Social Media Links */}
                <div className={styles.socialLinks}>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
