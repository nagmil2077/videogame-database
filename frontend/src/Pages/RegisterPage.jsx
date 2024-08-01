import React from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../Components/UserForm";
import axios from "axios";
import "./FormPage.css";

const registerUser = (formData) => {
    return axios.post('http://localhost:8000/api/register', formData);
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
        <div className="form-page-container">
            <h2 className="form-title">Register</h2>
            <UserForm
                handleSubmit={handleSubmit}
                onCancel={() => navigate('/')}
                buttonLabel="Register"
            />
        </div>
    );
};

export default RegisterPage;
