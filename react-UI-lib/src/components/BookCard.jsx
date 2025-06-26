// src/components/BookCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function BookCard({ imagen, titulo, autor, categoria }) {
    const categoryPath = categoria.toLowerCase().replace(/\s+/g, '-');

    return (
        <Link to={`/category/${categoryPath}`} className="text-decoration-none text-dark book-card-link">
            <Card style={{
                width: '15rem',
                height: '25rem',
                margin: '0.5rem',
                boxShadow: '0 0.125rem 0.3125rem rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }}>
                <Card.Img
                    variant="top"
                    src={imagen}
                    alt={`Portada de ${titulo}`}
                    style={{
                        width: '100%',
                        height: '15rem',
                        objectFit: 'cover',
                        padding: '0.5rem'
                    }}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/150x200/cccccc/333333?text=Sin+Imagen';
                    }}
                />

                <Card.Body style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    padding: '0.75rem'
                }}>
                    <Card.Title style={{
                        fontSize: '1rem',
                        textTransform: 'uppercase',
                        marginBottom: '0.3rem',
                        height: '2.5rem',
                        overflow: 'hidden',
                    }}>
                        {titulo}
                    </Card.Title>
                    <Card.Text style={{
                        fontSize: '1rem',
                        color: '#555'
                    }}>
                        {autor}
                    </Card.Text>
                    <Button variant="primary" style={{ marginTop: 'auto' }}>
                        Ver
                    </Button>
                </Card.Body>
            </Card>
        </Link>
    );
}

export default BookCard;
