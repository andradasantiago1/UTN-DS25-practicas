import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginPage from '../pages/LoginPage';

//mostrar la página de login solo si el user NO está autenticado, de estarlo redirige a /.
function LoginRoute() {
	const { isAuthenticated, loading } = useAuth();

	if (loading) {
		return <div>Cargando autenticación...</div>;
	}

	if (isAuthenticated) {
		//usuario está autenticado, redirige a pagina ppal.
		return <Navigate to="/" replace />;
	}

	//si no está autenticado, muestra la página de login.
	return <LoginPage />;
}

export default LoginRoute;