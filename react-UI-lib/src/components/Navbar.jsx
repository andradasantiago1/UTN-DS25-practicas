// src/components/CustomNavbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

function CustomNavbar() {
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Librería</Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                        <Nav.Link as={Link} to="/category/ciencia-ficcion">Ciencia Ficción</Nav.Link>
                        <Nav.Link as={Link} to="/category/historia">Historia</Nav.Link>
                        <Nav.Link as={Link} to="/category/novelas">Novelas</Nav.Link>
                        <Nav.Link as={Link} to="/category/fantasia">Fantasía</Nav.Link>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
                        <Nav.Link as={Link} to="/add-book">Agregar Libro</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;