import React, {useContext, useState} from "react";
import { AuthContext } from '../Contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {Modal, Button, Container} from "react-bootstrap";
import axios from 'axios';
import './FormPage.css';

const deleteUserProfile = (token) => {
    return axios.delete('http://localhost:8000/api/profile/', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

const ProfilePage = () => {
    const { user, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDeleteProfile = () => {
        try {
            const token = localStorage.getItem('auth_token');
            deleteUserProfile(token);
            localStorage.removeItem('auth_token');
            updateUser(null);
            alert('Profile deleted successfully');
            navigate('/');
        } catch (error) {
            console.error('Error deleting profile:', error);
            alert('Failed to delete profile. Please try again.');
        }
    }

    return (
        <div className="form-page-container">
            <h2 className="form-title">Welcome, {user.name}!</h2>
            <Container className="d-flex flex-column align-items-center">
                <Button
                    variant="primary"
                    className="my-2"
                    size="lg"
                    onClick={() => navigate('/favorites')}>
                    View Favorites
                </Button>
                <Button
                    variant="primary"
                    className="my-2"
                    size="lg"
                    as={Link}
                    to="/profile/update">
                    Update Profile
                </Button>
                <Button
                    variant="danger"
                    className="my-2"
                    size="lg"
                    onClick={() => setShowConfirm(true)}>
                    Delete Profile
                </Button>
            </Container>

            {/* Delete Confirmation Modal */}
            <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete your profile? This action cannot be undone.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirm(false)}>
                        No
                    </Button>
                    <Button variant="danger" onClick={handleDeleteProfile}>
                        Yes, delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProfilePage;
