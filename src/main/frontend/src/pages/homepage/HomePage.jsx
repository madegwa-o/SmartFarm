import React from 'react';
import styles from './HomePage.module.css';
import {useNavigate} from "react-router-dom";

const HomePage = () => {

    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <h1>Welcome to GreenCup</h1>
                <p>Your trusted partner in sustainable tea farming solutions.</p>
                <button onClick={() =>(navigate("/login"))} className={styles.ctaButton}>Get Started</button>
            </section>

            {/* About Section */}
            <section className={styles.about}>
                <h2>About Us</h2>
                <p>
                    GreenCup provides expert consultancy to help tea farmers maximize yield,
                    reduce costs, and implement sustainable practices. With years of experience,
                    we’re committed to improving the tea farming industry.
                </p>
            </section>

            {/* Services Section */}
            <section className={styles.services}>
                <h2>Our Services</h2>
                <div className={styles.serviceList}>
                    <div className={styles.serviceItem}>
                        <h3>Soil Analysis</h3>
                        <p>Detailed soil assessments to improve yield quality.</p>
                    </div>
                    <div className={styles.serviceItem}>
                        <h3>Pest Management</h3>
                        <p>Eco-friendly pest control strategies.</p>
                    </div>
                    <div className={styles.serviceItem}>
                        <h3>Sustainable Practices</h3>
                        <p>Guidance on implementing sustainable farming techniques.</p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className={styles.contact}>
                <h2>Contact Us</h2>
                <p>Ready to take your tea farming to the next level? Reach out to GreenCup today!</p>
                <button className={styles.contactButton}>Contact Us</button>
            </section>
        </div>
    );
};

export default HomePage;
