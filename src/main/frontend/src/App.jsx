// src/App.jsx
import React, { useState, createContext } from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import HomePage from "./pages/homepage/HomePage";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./components/login/Login";
import Header from "./components/header/Header";

export const LoginContext = createContext();

function App({ loggedIn }) {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(loggedIn);
    const handleLoginSuccess = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem("isLoggedIn");
        setUser(null);
        setIsLoggedIn(false);
        window.location.reload();
    };

    return (
        <LoginContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
            <BrowserRouter>
                <Header onLogout={handleLogout} />
                <Routes>
                    {loggedIn ? (
                        <Route path="/dashboard" element={<Dashboard user={user} />} />
                    ) : (
                        <>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </>
                    )}
                </Routes>
            </BrowserRouter>
        </LoginContext.Provider>
    );
}

export default App;
