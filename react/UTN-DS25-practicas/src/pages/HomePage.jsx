import React from 'react';
import BookCard from '../components/BookCard'; 

function HomePage() {
    const librosDestacados = [
        {id: 1, imagen: "./css-img/logoHPcamara.webp",titulo: "Harry Potter y la cámara secreta",autor: "J. K. Rowling", categoria: "Fantasia", path: "/fantasia"},
        {id: 2, imagen: "./css-img/dune.jpg",titulo: "Dune",autor: "Frank Herbert", categoria: "Ciencia Ficcion", path: "/ciencia-ficcion"},
        {id: 3, imagen: "./css-img/losGuemes.jpg",titulo: "Los Guemes",autor: "Felipe Pigna", categoria: "Historia", path: "/historia"},
        {id: 4, imagen: "./css-img/donQuijote.jpg",titulo: "Don Quijote de la Mancha",autor: "Miguel Cervantes", categoria: "Novelas", path: "/novelas"}
    ];
    return (
        <div id="contenido">
            {librosDestacados.map((libro) => (
                <BookCard
                    key={libro.id} 
                    imagen={libro.imagen}
                    titulo={libro.titulo}
                    autor={libro.autor}
                    categoria={libro.categoria}
                    path={libro.path} 
                />
            ))}
        </div>
    );
}
export default HomePage;
