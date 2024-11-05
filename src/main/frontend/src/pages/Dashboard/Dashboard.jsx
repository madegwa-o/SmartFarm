// src/pages/dashboard/Dashboard.jsx
import React, { useEffect, useState, useRef } from 'react';
import styles from './Dashboard.module.css';
import UserService from "../../services/UserService";
import Sidebar from "../../components/sidebar/Sidebar";
import userService from "../../services/UserService";
import MapPolygon from "../../components/UserMap/MapPolygon.jsx";
import Settings from "../Settings/Settings.jsx";

const userId = localStorage.getItem("userId");
const userImage = '/src/assets/img.png';

const Dashboard = () => {
    const [user, setUser] = useState({});
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
    const [currentSection, setCurrentSection] = useState("profile");
    const sidebarRef = useRef(null);
    const [consultants, setConsultants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConsultants = async () => {
            try {
                const consultantResponse = await userService.getUserByRole('CONSULTANT');
                setConsultants(consultantResponse.data);
            } catch (error) {
                console.error("Failed to fetch consultants:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchConsultants();
    }, []);

    useEffect(() => {
        async function fetchUser() {
            try {
                const userResponse = await UserService.getUserById(userId);
                setUser(userResponse.data);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        }
        fetchUser();

        const handleResize = () => {
            setIsSidebarOpen(window.innerWidth > 768);
        };
        window.addEventListener("resize", handleResize);

        const handleClickOutside = (event) => {
            if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("resize", handleResize);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [userId, isSidebarOpen]);

    return (
        <div className={styles.dashboardContainer}>
            <Sidebar
                ref={sidebarRef}
                isOpen={isSidebarOpen}
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                setCurrentSection={setCurrentSection}
            />

            <main className={`${styles.mainContent} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
                {currentSection === "profile" && (
                    <section className={styles.profileSection}>
                        <h2>User Profile</h2>
                        <div className={styles.profileDetails}>
                            <div className={styles.userImageContainer}>
                                <img src={userImage} alt="User profile" className={styles.userImage}/>
                            </div>
                            <div className={styles.profileCard}>
                                <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Phone:</strong> {user.phone}</p>
                                <p><strong>Address:</strong> {user.address}, {user.city}</p>
                                <p><strong>Member since:</strong> {new Date(user.joinedDate).toLocaleDateString()}</p>
                            </div>

                        </div>
                    </section>
                )}

                {currentSection === "myFarm" && (
                    <section className={styles.myFarmSection}>
                    <h2>Mark the boundaries of the Farm</h2>
                        <MapPolygon/>
                    </section>
                )}

                {currentSection === "settings" && (
                    <section className={styles.settingsSection}>
                        <h2>Settings</h2>
                        <div className={styles.settingsContent}>
                            <Settings />
                        </div>
                    </section>
                )}

                {currentSection === "consultants" && (
                    <section className={styles.consultantsSection}>
                        <h2>Consultants</h2>
                        <div className={styles.consultantsContent}>
                            {loading ? (
                                <p>Loading consultants...</p>
                            ) : (
                                consultants.length > 0 ? (
                                    consultants.map((consultant, index) => (
                                        <div key={index} className={styles.consultantCard}>
                                            <img
                                                src={`https://picsum.photos/100/100?random=${index}`}
                                                alt={`${consultant.firstName} ${consultant.lastName}`}
                                                className={styles.consultantImage}
                                            />
                                            <h3>{consultant.firstName} {consultant.lastName}</h3>
                                            <p><strong>Email:</strong> {consultant.email}</p>
                                            <p><strong>Phone:</strong> {consultant.phone}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No consultants found.</p>
                                )
                            )}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
