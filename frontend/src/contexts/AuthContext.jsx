import { createContext, useState, useContext, useEffect } from 'react';

import { //helpers
	getToken,
	setToken,
	clearToken,
	parseJWT,
	getUserData,
	isTokenExpired
} from '../helpers/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = getToken();
		if (token && !isTokenExpired()) {
			const userData = getUserData();
			setUser(userData);
		} else if (token) {
			clearToken();
		}
		setLoading(false);
	}, []);

	const login = async (email, password) => {
		try {
			const res = await fetch("http://localhost:3000/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password })
			});

			if (!res.ok) {
				const error = await res.json();
				throw new Error(error.message || "Error en login");
			}

			const { data } = await res.json();
			setToken(data.token);

			const userData = parseJWT(data.token);
			setUser(userData);

			return { success: true };
		} catch (error) {
			//si el error es Failed to Fetch lo redefino para cambiar el mensaje q se muestra
			if (error instanceof TypeError || error.message.includes('Failed to fetch')) {
				return { success: false, error: 'SERVICE_UNAVAILABLE' };
			}
			return { success: false, error: error.message };
		}
	};

	const logout = () => {
		clearToken();
		setUser(null);
	};
	useEffect(() => {
		const interval = setInterval(() => {
			if (isTokenExpired()) {
				logout();
			}
		}, 60000); // cada minuto
		return () => clearInterval(interval);
	}, []);
	const value = {
		user,
		login,
		logout,
		loading,
		isAuthenticated: !!user,
		isAdmin: user?.role === 'ADMIN',
		isUser: user?.role === 'USER',
		hasRole: (role) => user?.role === role,
		canAccess: (resource) => {
			if (!user) return false;
			if (user.role === 'ADMIN') return true;
			return false;
		}
	};
	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth debe usarse dentro de AuthProvider');
	}
	return context;
}