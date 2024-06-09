import React from 'react';
import { Outlet } from "react-router-dom";
import {Navbar, Nav, Container} from 'react-bootstrap';
import SearchField from '../../Components/SearchField';
import "./Header.css"

const Header = () => {
    return (
        <div className="Header">
            <Navbar bg="dark" variant="dark" expand="lg" className="navbar-custom">
                <Container>
                    <Navbar.Brand href="#">VGDB</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                        <SearchField />
                        <Nav className="ml-auto">
                            <Nav.Link href="#login">Login</Nav.Link>
                            <Nav.Link href="#register">Register</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </div>
    );
}

export default Header;
