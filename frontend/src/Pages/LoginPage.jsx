import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import LoginForm from '../Components/LoginForm';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import './FormPage.css';

const loginUser = (formData) => {
  return axios.post('http://localhost:8000/api/login', formData);
};

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (formData) => {
        try {
            const response = await loginUser(formData);
            const { token, user } = response.data;
            localStorage.setItem('auth_token', token);
            login(user);
            alert('Login successful');
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials and try again.');
        }
    }

    return (
        <div className="form-page-container">
            <h2 className="form-title">Login</h2>
            <LoginForm
                handleSubmit={handleSubmit}
                onCancel={() => navigate('/')}
            />
        </div>
    );
};

export default LoginPage;
