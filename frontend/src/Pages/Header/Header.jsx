import React, { useContext } from 'react';
import { Link, Outlet } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import SearchField from '../../Components/SearchField';
import { AuthContext } from '../../Contexts/AuthContext';
import "./Header.css"

const Header = () => {
    const {user, logout} = useContext(AuthContext);

    return (
        <div className="Header">
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="navbar-custom">
                <Container>
                    <Navbar.Brand as={Link} to="/">VGDB</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                        <SearchField/>
                        <Nav className="ml-auto">
                            {user ? (
                                <NavDropdown menuVariant="dark" title={user.name} id="user-dropdown">
                                    <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => logout()}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <>
                                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                    <Nav.Link as={Link} to="/register">Register</Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet/>
        </div>
    );
};

export default Header;
