import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { UsuarioProvider } from './contexts/UsuarioContext'; 
import { PrivateRoute } from './components/PrivateRoute';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import './App.css';
import ListaDeUsuarios from './components/ListaDeUsuarios'; 

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<UsuarioProvider> 
					<Layout>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/login" element={<LoginPage />} />
							{/* Ruta protegida - usuarios logueados */}
							<Route
								path="/contact"
								element={
									<PrivateRoute>
										<ContactPage />
									</PrivateRoute>
								}
							/>
							{/* Ruta protegida - solo rol ADMIN */}
							<Route
								path="/catalog"
								element={
									<PrivateRoute requiredRole="ADMIN">
										<CatalogPage />
									</PrivateRoute>
								}
							/>
							<Route
								path="/admin/users"
								element={
									<PrivateRoute requiredRole="ADMIN">
										<ListaDeUsuarios /> 
									</PrivateRoute>
								}
							/>
							<Route
								path="/unauthorized"
								element={<div>No tienes permisos para ver esta página</div>}
							/>
						</Routes>
					</Layout>
				</UsuarioProvider>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;