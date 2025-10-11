import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import BookCard from '../components/BookCard';
import Searchbar from '../components/Searchbar';
import { useFetch } from '../hooks/useFetch';

const API_URL = '/api/books?limit=1000';

const CategoryPage = () => {
	const { data, loading, error } = useFetch(API_URL, {}, { requireAuth: false });
	const books = data?.data || [];
	const { categoryName } = useParams();
	const location = useLocation();
	
	const [filteredBooks, setFilteredBooks] = useState([]);
	
	const [currentSearchTerm, setCurrentSearchTerm] = useState('');
	const [isSpecificBookSearch, setIsSpecificBookSearch] = useState(false);
	
	const [manualSearchTerm, setManualSearchTerm] = useState('');

	useEffect(() => {
		if (loading || books.length === 0) return;

		const params = new URLSearchParams(location.search);
		const bookId = params.get('bookId');

		let booksToDisplay = [];

		if (bookId) {
			const targetBook = books.find(book => book.id === parseInt(bookId));
			booksToDisplay = targetBook ? [targetBook] : [];
			setIsSpecificBookSearch(true);
			setCurrentSearchTerm(targetBook ? targetBook.titulo : `ID: ${bookId}`);
			setManualSearchTerm('');
		} else {
			const normalizedCategoryFromUrl = categoryName
				.toUpperCase()
				.replace(/-/g, '_')
				.trim();
				
			let categoryBooks = books.filter(book =>
				book.categoria && book.categoria.trim() === normalizedCategoryFromUrl
			);
			
			if (manualSearchTerm) {
				const term = manualSearchTerm.toLowerCase();
				categoryBooks = categoryBooks.filter(book => 
					(book.titulo && book.titulo.toLowerCase().includes(term)) ||
					(book.autor && book.autor.toLowerCase().includes(term))
				);
			}
			
			booksToDisplay = categoryBooks;
			setIsSpecificBookSearch(false);
			setCurrentSearchTerm('');
		}
		
		setFilteredBooks(booksToDisplay);
	}, [categoryName, location.search, books, loading, manualSearchTerm]); 

	const formatCategoryTitle = (name) => {
		if (!name) return 'Categoría Desconocida';
		return name.replace(/[-_]/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
	};
	
	const handleSearch = (term) => {
		setManualSearchTerm(term);
	};

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

	let pageTitle = `Libros de ${formatCategoryTitle(categoryName)}`;
	if (manualSearchTerm) {
		pageTitle = `Resultados para "${manualSearchTerm}" en ${formatCategoryTitle(categoryName)}`;
	} else if (isSpecificBookSearch && currentSearchTerm) {
		pageTitle = `Resultado de búsqueda: "${currentSearchTerm}"`;
	}

	return (
		<Container className="my-4"> 
			
			<h1 className="category-title mb-3"> 
				{pageTitle}
			</h1>

			<Row className="justify-content-center mb-4">
				<Col xs={12} md={8} lg={6}>
					<Searchbar 
						initialSearchValue={manualSearchTerm} 
						onSearch={handleSearch}
					/>
				</Col>
			</Row>

			<Row className="justify-content-center">
				{filteredBooks.length > 0 ? (
					filteredBooks.map((book) => (
						<Col key={book.id} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center"> 
							<BookCard
								book={book}
							/>
						</Col>
					))
				) : (
					<Col xs={12}>
						<p className="text-center text-lg text-gray-700">
							{manualSearchTerm
								? `No se encontraron resultados para "${manualSearchTerm}" en esta categoría.`
								: isSpecificBookSearch 
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