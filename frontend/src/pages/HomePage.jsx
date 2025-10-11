import	 React, { useState, useEffect } from 'react';
import	 BookCard from '../components/BookCard';	

function	 HomePage () {
	const	[librosDestacados, setLibrosDestacados] = useState([]);
	const	[cargando, setCargando] = useState(true);
	const	[error, setError] = useState(null);

	useEffect(() => {
		const	fetchLibrosDestacados = async () => {
			try {
				const	response = await fetch('http://localhost:3000/api/books/featured');	
				
				if	(!response.ok) {
					throw	new Error(`Error al cargar los datos: ${response.statusText}`);
				}

				const	data = await response.json();
				setLibrosDestacados(data);
			}	catch	(err) {
				console.error("Error fetching libros:", err);
				setError(err.message);
			}	finally {
				setCargando(false);
			}
		};

		fetchLibrosDestacados();
	}, []);

	if	(cargando) {
		return	<div>Cargando libros destacados...</div>;
	}

	if	(error) {
		return	<div>Error: {error}</div>;
	}

	if	(librosDestacados.length === 0) {
		return	<div>No hay libros destacados disponibles.</div>;
	}

	return (
		<div id="contenido">
			{librosDestacados.map((libro) => (
				<BookCard
					key={libro.id}	
					book={libro}
				/>
			))}
		</div>
	);
}

export	default HomePage ;