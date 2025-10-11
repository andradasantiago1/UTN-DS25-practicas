import { useState, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
import BookCard from '../components/BookCard';
import { Container, Row, Col } from 'react-bootstrap';
import Searchbar from '../components/Searchbar';

function CatalogPage() {
	const url = '/api/books?limit=1000';
	const { data, loading, error } = useFetch(url, {}, { requireAuth: true });
	const books = data?.data || []; 
	
	const [filteredBooks, setFilteredBooks] = useState([]);
	const [manualSearchTerm, setManualSearchTerm] = useState('');

	useEffect(() => {
		if (loading) return;

		let booksToDisplay = books;

		//filtrado se ejecuta inmediatamente al cambiar manualSearchTerm
		if (manualSearchTerm) {
			const term = manualSearchTerm.toLowerCase();
			booksToDisplay = books.filter(book => 
				(book.titulo && book.titulo.toLowerCase().includes(term)) ||
				(book.autor && book.autor.toLowerCase().includes(term))
			);
		}
		
		setFilteredBooks(booksToDisplay);
	}, [books, loading, manualSearchTerm]);

	const handleSearch = (term) => {
		setManualSearchTerm(term);
	};

	if (loading) return <p>Cargando...</p>;
	if (error) return <p>Error: {error.message}</p>;

	let pageTitle = "Catálogo";
	if (manualSearchTerm) { 
		pageTitle = `Resultados de búsqueda: "${manualSearchTerm}"`;
	}

	return (
		<Container className="my-4">
			
			<Row className="mb-2">
				<Col xs={12}>
					<h1 className="category-title mb-1"> 
						{pageTitle}
					</h1>
				</Col>
				<Col xs={12}>
					<div className="results-section text-center">
						<p>Mostrando {filteredBooks.length} resultados</p>
					</div>
				</Col>
			</Row>

			<Row className="justify-content-center mb-4">
				<Col xs={12} md={8} lg={6}>
					<Searchbar
						searchValue={manualSearchTerm}
						onValueChange={handleSearch} 
						onSearch={handleSearch}
					/>
				</Col>
			</Row>

			<Row className="justify-content-center">
				{loading ? (
					<Col xs={12}><div>Cargando resultados...</div></Col>
				) : (
					<>
						{filteredBooks.length > 0 ? (
							filteredBooks.map((book) => (
								<Col key={book.id} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center">
									<BookCard book={book} />
								</Col>
							))
						) : (
							<Col xs={12}>
								<p className="text-center text-lg text-gray-700">
									{manualSearchTerm 
										? `No se encontraron resultados para "${manualSearchTerm}" en el catálogo.`
										: `No se encontraron libros.`
									}
								</p>
							</Col>
						)}
					</>
				)}
			</Row>
		</Container>
	);
}

export default CatalogPage;