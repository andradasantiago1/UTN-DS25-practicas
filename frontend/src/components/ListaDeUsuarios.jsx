import { useFetch } from '../hooks/useFetch';

function ListaDeUsuarios() {
	const { data, loading, error } = useFetch('/api/users'); 
	if (loading) return <div>Cargando usuarios...</div>;
	if (error) return <div>Error al cargar usuarios: {error.message || error}</div>; 

	return (
		<div>
			<h2>👥 Lista de Usuarios</h2>
			{data?.map(usuario => (
				<div key={usuario.id}>
					<h3>{usuario.name}</h3>
					<p>Email: {usuario.email}</p>
					<p>Rol: {usuario.role}</p> 
				</div>
			))}
		</div>
	);
}
export default ListaDeUsuarios;