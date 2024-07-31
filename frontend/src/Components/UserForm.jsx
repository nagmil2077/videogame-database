import React, {useEffect, useState} from "react";
import {Form, Button, Container, Row, Col, InputGroup, Alert, Collapse} from 'react-bootstrap';
import {FaEye, FaEyeSlash} from "react-icons/fa";
import './UserForm.css';

const UserForm = ({handleSubmit, onCancel, initialData = {}, buttonLabel}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [passwordFocused, setPasswordFocused] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({ ...formData, ...initialData });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.password_confirmation) {
            setError('Passwords do not match!');
            return;
        }
        setError('');
        handleSubmit(formData);
    };

    return (
        <Container className="user-form-container">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Form onSubmit={onSubmit} className="user-form">
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form.Group controlId="formName" className="user-form-group">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail" className="user-form-group">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="user-form-group">
                            <Form.Label>Password</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    onFocus={() => setPasswordFocused(true)}
                                    onBlur={() => setPasswordFocused(false)}
                                />
                                <Button onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash/> : <FaEye/>}
                                </Button>
                                <Collapse in={passwordFocused}>
                                    <div>
                                        <Form.Text className="text-muted user-form-text">
                                            Your password must be at least 5 characters long and must not contain spaces
                                            or special characters.
                                        </Form.Text>
                                    </div>
                                </Collapse>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="formPasswordConfirmation" className="user-form-group">
                            <Form.Label>Confirm Password</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    name="password_confirmation"
                                    value={formData.password_confirmation}
                                    onChange={handleChange}
                                />
                                <Button onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <FaEyeSlash/> : <FaEye/>}
                                </Button>
                            </InputGroup>
                        </Form.Group>
                        <div className="button-container">
                            <Button
                                variant="primary"
                                type="submit"
                                className="user-form-button">
                                {buttonLabel}
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={onCancel}
                                className="user-form-button">
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default UserForm;
