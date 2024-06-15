import React from 'react';
import { useNavigate } from "react-router-dom";
import LoginForm from '../Components/LoginForm';
import './RegisterPage.css';

const loginUser = (formData) => {
  return axios.post('http://127.0.0.1:8000/api/login', formData);
};

const LoginPage = () => {
    const navigate = useNavigate();

    const handleSubmit = (formData) => {
        try {

        } catch (error) {

        }
    }

    return (
        <div className="register-page-container">
            <h2 className="register-title">Login</h2>
            <LoginForm
                handleSubmit={handleSubmit}
                onCancel={() => navigate('/')}
            />
        </div>
    );
};

export default LoginPage;
