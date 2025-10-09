import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import BookCard from '../components/BookCard';
import { useFetch } from '../hooks/useFetch'; // Asegúrate de importar el hook

// Definimos la URL de la API. Asumimos que esta API trae la lista completa o una lista grande.
// Ajusta 'limit' si es necesario para asegurar que se traen todos los libros.
const API_URL = '/api/books?limit=1000'; // Ajusta la URL a tu endpoint real

const CategoryPage = () => {
	// 1. Cargar los datos usando useFetch
	const { data, loading, error } = useFetch(API_URL, {}, { requireAuth: false });
	const books = data?.data || []; // Aseguramos que 'books' es un array si la carga es exitosa

	const { categoryName } = useParams();
	const location = useLocation();

	// Estados para el filtrado
	const [filteredBooks, setFilteredBooks] = useState([]);
	const [currentSearchTerm, setCurrentSearchTerm] = useState('');
	const [isSpecificBookSearch, setIsSpecificBookSearch] = useState(false);

	useEffect(() => {
		// Solo ejecutar el filtrado si la carga ha terminado y tenemos datos
		if (loading || books.length === 0) return;

		const params = new URLSearchParams(location.search);
		const bookId = params.get('bookId');

		let booksToDisplay = [];

		if (bookId) {
			// Lógica para búsqueda por ID
			const targetBook = books.find(book => book.id === parseInt(bookId));
			booksToDisplay = targetBook ? [targetBook] : [];
			setIsSpecificBookSearch(true);
			setCurrentSearchTerm(targetBook ? targetBook.titulo : `ID: ${bookId}`);
		} else {
			// Lógica para filtrado por categoría
			// MODIFICACIÓN CLAVE 1: Normalización ajustada para coincidir con mayúsculas y guiones bajos del backend (ej: CIENCIA_FICCION)
			const normalizedCategoryFromUrl = categoryName
				.toUpperCase()
				.replace(/-/g, '_')
				.trim();
				
			booksToDisplay = books.filter(book =>
				// MODIFICACIÓN CLAVE 2: Comparamos el valor del libro (limpiado de espacios) directamente con el valor normalizado de la URL
				book.categoria && book.categoria.trim() === normalizedCategoryFromUrl
			);
			
			setIsSpecificBookSearch(false);
			setCurrentSearchTerm('');
		}

		setFilteredBooks(booksToDisplay);

	}, [categoryName, location.search, books, loading]);

	const formatCategoryTitle = (name) => {
		if (!name) return 'Categoría Desconocida';
		return name.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
	};

	// 2. Manejo del estado de la petición (Cargando y Error)
	if (loading) {
		return (
			<Container className="my-5 text-center">
				<Spinner animation="border" role="status" />
				<p>Cargando catálogo...</p>
			</Container>
		);
	}

	if (error) {
		return <Container className="my-5 text-center"><p className="text-danger">Error al cargar los libros: {error.message}</p></Container>;
	}


	// 3. Renderizado del contenido (similar a su código original)
	return (
		<Container className="my-5">
			<h1 className="text-4xl font-bold text-center mb-5 text-dark">
				{isSpecificBookSearch && currentSearchTerm
					? `Resultado de búsqueda: "${currentSearchTerm}"`
					: `Libros de ${formatCategoryTitle(categoryName)}`}
			</h1>

			<Row className="justify-content-center">
				{filteredBooks.length > 0 ? (
					filteredBooks.map((book) => (
						<Col key={book.id} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex align-items-stretch">
							<BookCard
								imagen={book.imagen}
								titulo={book.titulo}
								autor={book.autor}
								categoria={book.categoria}
							/>
						</Col>
					))
				) : (
					<Col xs={12}>
						<p className="text-center text-lg text-gray-700">
							{isSpecificBookSearch && currentSearchTerm
								? `No se encontró el libro solicitado.`
								: `No se encontraron libros para esta categoría.`}
						</p>
					</Col>
				)}
			</Row>
		</Container>
	);
};

export default CategoryPage;