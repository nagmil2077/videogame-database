import React from 'react';
import { useNavigate } from "react-router-dom";
import LoginForm from '../Components/LoginForm';
import axios from 'axios';
import './LoginPage.css';

const loginUser = (formData) => {
  return axios.post('http://127.0.0.1:8000/api/login', formData);
};

const LoginPage = () => {
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        try {
            const response = await loginUser(formData);
            const { token, user } = response.data;
            localStorage.setItem('auth_token', token);
            alert('Login successful');
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials and try again.');
        }
    }

    return (
        <div className="login-page-container">
            <h2 className="login-title">Login</h2>
            <LoginForm
                handleSubmit={handleSubmit}
                onCancel={() => navigate('/')}
            />
        </div>
    );
};

export default LoginPage;
