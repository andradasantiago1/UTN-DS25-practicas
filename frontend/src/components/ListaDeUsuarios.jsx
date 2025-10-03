
import { useFetch } from '../hooks/useFetch';

function ListaDeUsuarios() {
	const { data, loading, error } = useFetch('/api/users', {}, { requireAuth: true });

	if (loading) return <div>Cargando usuarios...</div>;
	if (error) return <div>Error al cargar usuarios: {error.message || error}</div>; 
	const usersArray = data?.users || [];

	return (
		<div>
			<h2>👥 Lista de Usuarios</h2>
			{usersArray.length > 0 ? (
				usersArray.map(usuario => (
					<div key={usuario.id}>
						<h3>{usuario.name}</h3>
						<p>Email: {usuario.email}</p>
						<p>Rol: {usuario.role}</p> 
					</div>
				))
			) : (
				<p>No se encontraron usuarios o la lista está vacía.</p>
			)}
		</div>
	);
}
export default ListaDeUsuarios;