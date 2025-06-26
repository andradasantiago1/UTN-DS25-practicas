import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import BookCard from '../components/BookCard';

const CategoryPage = ({ books }) => {
  const { categoryName } = useParams();
  const location = useLocation();
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');
  const [isSpecificBookSearch, setIsSpecificBookSearch] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const bookId = params.get('bookId');

    let booksToDisplay = [];

    if (bookId) {
      const targetBook = books.find(book => book.id === parseInt(bookId));
      booksToDisplay = targetBook ? [targetBook] : [];
      setIsSpecificBookSearch(true);
      setCurrentSearchTerm(targetBook ? targetBook.titulo : `ID: ${bookId}`);
    } else {
      const normalizedCategoryFromUrl = categoryName.toLowerCase().replace(/-/g, ' ');
      booksToDisplay = books.filter(book =>
        book.categoria.toLowerCase() === normalizedCategoryFromUrl
      );
      setIsSpecificBookSearch(false);
      setCurrentSearchTerm('');
    }

    setFilteredBooks(booksToDisplay);
  }, [categoryName, location.search, books]);

  const formatCategoryTitle = (name) => {
    if (!name) return 'Categoría Desconocida';
    return name.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

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
