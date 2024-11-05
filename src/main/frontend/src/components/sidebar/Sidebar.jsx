// src/components/Sidebar/Sidebar.jsx
import React, { forwardRef } from 'react';
import styles from './Sidebar.module.css';
import { FaUser, FaLeaf, FaMoneyBillWave, FaUsers } from 'react-icons/fa';

const userImage = '/src/assets/img.png';

const Sidebar = forwardRef(({ isOpen, toggleSidebar, setCurrentSection }, ref) => {
    return (
        <aside ref={ref} className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
            <div>
                <button className={styles.toggleButton} onClick={toggleSidebar}>
                    ☰
                </button>
                <ul className={styles.menu}>
                    <li>
                        <button onClick={() => setCurrentSection("profile")} className={styles.menuButton}>
                            <FaUser className={styles.icon} /> Profile
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setCurrentSection("myFarm")} className={styles.menuButton}>
                            <FaLeaf className={styles.icon} /> My Farm
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setCurrentSection("payments")} className={styles.menuButton}>
                            <FaMoneyBillWave className={styles.icon} /> Payments
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setCurrentSection("consultants")} className={styles.menuButton}>
                            <FaUsers className={styles.icon} /> Experts
                        </button>
                    </li>
                </ul>
            </div>
            <div className={styles.userImageContainer}>
                <img src={userImage} alt="User profile" className={styles.userImage}/>
            </div>
        </aside>
    );
});

export default Sidebar;
