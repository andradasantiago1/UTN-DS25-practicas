// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ContactPage from './pages/ContactPage';
import CategoryPage from './pages/CategoryPage';
import CatalogPage from './pages/CatalogPage';
import AddBookForm from './components/AddBookForm'; 
import initialBooksData from './data/booksData';

function App() {
  const [books, setBooks] = useState(initialBooksData);
  const handleAddBook = (newBook) => {
    const newId = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
    setBooks(prevBooks => [...prevBooks, { ...newBook, id: newId }]);
  };

  return (
    <Layout books={books} setBooks={setBooks}>
      <Routes>
        <Route path="/" element={<HomePage books={books} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/category/:categoryName" element={<CategoryPage books={books} />} />
        <Route path="/catalogo" element={<CatalogPage />} />
        <Route path="/add-book" element={<AddBookForm onAddBook={handleAddBook} />} />
      </Routes>
    </Layout>
  );
}

export default App;