import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function BookCard({ imagen, titulo, autor, categoria, path }) {
    return (
        <Link to={path} className="text-decoration-none text-dark book-card-link">
            <Card style={{
                width: '15rem', // ancho fijo 
                height: '25rem', // alto fijo 
                margin: '0.5rem',
                boxShadow: '0 0.125rem 0.3125rem rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'}}>
                <Card.Img
                    variant="top"
                    src={imagen}
                    alt={`Portada de ${titulo}`}
                    style={{
                        width: '100%',
                        height: '15rem', // alto fijo para imágenes
                        objectFit: 'cover',
                        padding: '0.5rem'}}
                />

                <Card.Body style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    padding: '0.75rem'}}>

                    <Card.Title style={{
                        fontSize: '1rem',
                        textTransform: 'uppercase',
                        marginBottom: '0.3rem',
                        height: '2.5rem', // altura fija para el título
                        overflow: 'hidden',}}>
                        {titulo}
                    </Card.Title>

                    <Card.Text style={{
                        fontSize: '1rem',
                        color: '#555'}}>
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