import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../Contexts/AuthContext";
import {useNavigate} from "react-router-dom";
import UserForm from '../Components/UserForm';
import axios from 'axios';
import './FormPage.css';

const updateUser = (formData, token) => {
    return axios.put('http://localhost:8000/api/profile', formData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

const UpdateProfilePage = () => {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({name: '', email: ''});
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setFormData({ name: user.name, email: user.email });
        }
    }, [user]);

    const handleSubmit = async (data) => {
        try {
            const token = localStorage.getItem('auth_token');
            await updateUser(data, token);
            alert('Profile updated successfully');
            navigate('/profile');
        } catch (error) {
            console.error('Update failed:', error);
            alert('Update failed. Please check your information and try again.');
        }
    };

    return (
        <div className="form-page-container">
            <h2 className="form-title">Update Profile</h2>
            <UserForm
                handleSubmit={handleSubmit}
                onCancel={() => navigate('/profile')}
                initialData={formData}
                buttonLabel="Update Profile"
            />
        </div>
    );
};

export default UpdateProfilePage;
