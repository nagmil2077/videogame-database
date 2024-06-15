import React, { useState } from 'react';
import {Form, Button, Container, Row, Col, Alert, InputGroup} from 'react-bootstrap';
import './LoginForm.css';
import {FaEye, FaEyeSlash} from "react-icons/fa";

const LoginForm = ({ handleSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setError('Both fields are required!');
            return;
        }
        setError('');
        handleSubmit(formData);
    };

    return (
        <Container className="login-form-container">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Form onSubmit={onSubmit} className="login-form">
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form.Group controlId="formEmail" className="login-form-group">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="login-form-group">
                            <Form.Label>Password</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <Button onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash/> : <FaEye/>}
                                </Button>
                            </InputGroup>
                        </Form.Group>
                        <div className="button-container">
                            <Button variant="primary" type="submit" className="login-form-button">
                                Login
                            </Button>
                            <Button variant="secondary" type="button" onClick={onCancel} className="login-form-button">
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginForm;
