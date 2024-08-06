import React, {useState} from "react";
import {Form, Button, Container, Row, Col, InputGroup, Alert, Collapse} from 'react-bootstrap';
import {FaEye, FaEyeSlash} from "react-icons/fa";
import './UserForm.css';

const UserForm = ({handleSubmit, onCancel, user, buttonLabel}) => {
    const [name, setName] = useState(user?.name ?? '');
    const [email, setEmail] = useState(user?.email ?? '');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [passwordFocused, setPasswordFocused] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== password_confirmation) {
            setError('Passwords do not match!');
            return;
        }
        setError('');

        if (user) {
            return handleSubmit({
                ...user,
                name,
                email,
                password,
                password_confirmation,
            });
        }

        return handleSubmit({
            name,
            email,
            password,
            password_confirmation,
        });
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
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail" className="user-form-group">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                                    name="passwordConfirmation"
                                    value={password_confirmation}
                                    onChange={(e) => setPasswordConfirmation(e.target.value)}
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
