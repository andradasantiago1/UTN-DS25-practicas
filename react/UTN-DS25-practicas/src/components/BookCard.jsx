import React from 'react';
import { Link } from 'react-router-dom'; 

function BookCard({ imagen, titulo, autor, categoria, path }) {
    return (
        <Link to={path} className="book-card-link">
            <div className="libro-destacado">
                <h2>{titulo}</h2> 
                <img src={imagen} alt={`Portada de ${titulo}`} />
                <h4>{titulo}</h4>
                <p>{autor}</p>
            </div>
        </Link>
    );
}

export default BookCard;
