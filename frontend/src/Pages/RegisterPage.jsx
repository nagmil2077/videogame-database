import React from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../Components/UserForm";
import axios from "axios";
import "./RegisterPage.css";

const registerUser = (formData) => {
    return axios.post('http://127.0.0.1:8000/api/register', formData);
};

const RegisterPage = () => {
    const navigate = useNavigate();

    const handleSubmit = (formData) => {
        try {
            registerUser(formData)
                .then(() => navigate('/'));
        } catch (error) {
            console.error("Error registering user:", error);
        }
    };

    return (
        <div className="register-page-container">
            <h2 className="register-title">Register</h2>
            <UserForm
                handleSubmit={handleSubmit}
                onCancel={() => navigate('/')}
            />
        </div>
    );
};

export default RegisterPage;
