import React, { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BookCard from '../components/BookCard';
import { Searchbar } from '../components/Searchbar';

const HomePage = ({ books }) => {
  const [homeSearchValue, setHomeSearchValue] = useState('');
  const [displayedBooks, setDisplayedBooks] = useState([]);

  const featuredBooks = useMemo(() =>
    books.filter(book => book.destacado === true).slice(0, 4),
    [books]
  );

  const handleHomeSearch = (searchTerm) => {
    setHomeSearchValue(searchTerm);
  };

  useEffect(() => {
    let booksToDisplay = [];

    if (homeSearchValue.trim()) {
      const normalizedSearchValue = homeSearchValue.toLowerCase().trim();
      booksToDisplay = books.filter(book =>
        book.titulo.toLowerCase().includes(normalizedSearchValue) ||
        book.autor.toLowerCase().includes(normalizedSearchValue)
      );
    } else {
      booksToDisplay = featuredBooks;
    }
    setDisplayedBooks(booksToDisplay);
  }, [homeSearchValue, books, featuredBooks]);

  const getPageTitle = () => {
    if (homeSearchValue.trim()) {
      return `Resultados de bssqueda para "${homeSearchValue}"`;
    }
    return "Libros Destacados";
  };

  return (
    <Container className="my-5">
      <h1 className="text-4xl font-bold text-center mb-5 text-dark">
        {getPageTitle()}
      </h1>

      <div className="mb-4">
        <Searchbar onSearch={handleHomeSearch} initialSearchValue={homeSearchValue} />
      </div>

      <Row className="justify-content-center">
        {displayedBooks.length > 0 ? (
          displayedBooks.map((book) => (
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
              {homeSearchValue.trim()
                ? `No se encontraron libros que coincidan con "${homeSearchValue}".`
                : `No se encontraron libros destacados para mostrar.`}
            </p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default HomePage;
