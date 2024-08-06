import React, {useContext} from "react";
import {AuthContext} from "../Contexts/AuthContext";
import {useNavigate} from "react-router-dom";
import UserForm from '../Components/UserForm';
import axios from 'axios';
import './FormPage.css';

const updateUserProfile = (formData, token) => {
    return axios.patch('http://localhost:8000/api/profile/update', formData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

const UpdateProfilePage = () => {
    const { user, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        try {
            const token = localStorage.getItem('auth_token');
            const response = await updateUserProfile(data, token);
            const updatedUser = response.data.user;
            updateUser(updatedUser);
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
                user={user}
                buttonLabel="Update Profile"
            />
        </div>
    );
};

export default UpdateProfilePage;
