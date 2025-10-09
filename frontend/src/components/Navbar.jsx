import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../contexts/AuthContext';

function CustomNavbar() {
	const navigate = useNavigate();
	const { isAuthenticated, isAdmin, user, logout } = useAuth();

	const handleLogout = () => {
		logout();
		navigate('/');
	};

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
						<Nav.Link as={Link} to="/category/novela">Novelas</Nav.Link>
						<Nav.Link as={Link} to="/category/fantasia">Fantasía</Nav.Link>
						{isAuthenticated && (
							<Nav.Link as={Link} to="/contact">Contacto</Nav.Link>
						)}
						{isAdmin && (
							<>
								<Nav.Link as={Link} to="/catalog">Catálogo</Nav.Link>
								<Nav.Link as={Link} to="/admin/books">Agregar Libro</Nav.Link>
								<Nav.Link as={Link} to="/admin/users">Usuarios</Nav.Link>
							</>
						)}
					</Nav>
					<Nav>
						{isAuthenticated ? (
							<>
								<Navbar.Text className="mx-2">
									{user?.email}
								</Navbar.Text>
								<Nav.Link onClick={handleLogout} style={{ cursor: 'pointer' }}>
									Logout
								</Nav.Link>
							</>
						) : (
							<Nav.Link as={Link} to="/login">
								Login
							</Nav.Link>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default CustomNavbar;