import { useFetch } from '../hooks/useFetch';

function ListaDeProductos() {
	const { datos, cargando, error } = useFetch('/api/books'); 
	if (cargando) return <div>Cargando libros...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div>
			<h2>📚 Libros del Catálogo</h2>
			{datos?.map(libro => (
				<div key={libro.id}>
					<h3>{libro.titulo}</h3>
					<p>Autor: {libro.autor}</p>
				</div>
			))}
		</div>
	);
}

export default ListaDeProductos;