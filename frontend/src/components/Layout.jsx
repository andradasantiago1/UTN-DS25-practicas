import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Layout({ children }) {
	const navigate = useNavigate();
	const { isAuthenticated, isAdmin, user, logout } = useAuth();
	const handleLogout = () => {
		logout();
		navigate('/');
	};
	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						📚 Mi Librería Digital
					</Typography>
                    {/*enlaces publicos */}
					<Button color="inherit" component={RouterLink} to="/">
						🏠 Inicio
					</Button>
					{isAuthenticated && (
						<Button color="inherit" component={RouterLink} to="/contact">
							📧 Contacto
						</Button>
					)}
					{isAdmin && (
						<>
							<Button color="inherit" component={RouterLink} to="/catalog">
								📖 Catálogo
							</Button>
							<Button color="inherit" component={RouterLink} to="/admin/books">
								➕ Agregar Libro
							</Button>
							<Button color="inherit" component={RouterLink} to="/admin/users">
								👥 Usuarios
							</Button>
						</>
					)}
					{isAuthenticated ? (
						<>
							<Typography sx={{ mx: 2 }}>
								{user?.email}
							</Typography>
							<Button color="inherit" onClick={handleLogout}>
								🚪 Logout
							</Button>
						</>
					) : (
						<Button color="inherit" component={RouterLink} to="/login">
							🔑 Login
						</Button>
					)}
				</Toolbar>
			</AppBar>
			<Container maxWidth="lg" sx={{ mt: 4 }}>
				{children}
			</Container>
			<Box
				component="footer"
				sx={{ bgcolor: 'primary.main', color: 'white', p: 2, mt: 5 }}
			>
				<Typography variant="body2" align="center">
					© 2025 Mi Librería Digital
				</Typography>
			</Box>
		</>
	);
}

export default Layout;