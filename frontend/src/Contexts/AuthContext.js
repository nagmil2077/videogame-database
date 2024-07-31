import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Check for user when app loads
    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const updateUser = (newUserData) => {
        setUser(newUserData);
    };

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = async () => {
        try {
            const token = localStorage.getItem('auth_token');
            if (token) {
                await axios.post('http://localhost:8000/api/logout', {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            }
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setUser(null);
            localStorage.removeItem('user');
            localStorage.removeItem('auth_token');
        }
    };

    return (
        <AuthContext.Provider value={{ user, updateUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
