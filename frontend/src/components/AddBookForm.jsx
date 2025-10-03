import React, { useState } from 'react';

function AddBookForm({ onAddBook }) {
    const [newBookData, setNewBookData] = useState({
    titulo: '',
    autor: '',
    categoria: '',
    imagen: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBookData({
        ...newBookData,
        [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!newBookData.titulo.trim() || !newBookData.autor.trim() || !newBookData.categoria.trim()) {
            console.log('Por favor, completa el título, autor y categoría.'); // Cambiado de alert a console.log
        return;
        }

    onAddBook({
        ...newBookData,
        imagen: newBookData.imagen || 'https://placehold.co/150x200/cccccc/333333?text=Sin+Imagen',
        destacado: false,
    });

    setNewBookData({
        titulo: '',
        autor: '',
        categoria: '',
        imagen: '',
    });

    };

    return (
    <div style={{ padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', backgroundColor: '#f8f9fa', maxWidth: '500px', margin: 'auto' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>Agregar Nuevo Libro</h2>
        <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Título:</label>
            <input
                type="text"
                name="titulo"
                value={newBookData.titulo}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '8px', border: '1px solid #ced4da', borderRadius: '4px' }}
            />
        </div>

        <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Autor:</label>
            <input
                type="text"
                name="autor"
                value={newBookData.autor}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '8px', border: '1px solid #ced4da', borderRadius: '4px' }}
            />
        </div>

        <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Categoría:</label>
            <select
                name="categoria"
                value={newBookData.categoria}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '8px', border: '1px solid #ced4da', borderRadius: '4px' }}
            >
                <option value="">Selecciona una categoría...</option>
                <option value="Fantasia">Fantasia</option>
                <option value="Ciencia Ficcion">Ciencia Ficción</option>
                <option value="Historia">Historia</option>
                <option value="Novelas">Novelas</option>
            </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>URL de la Imagen (opcional):</label>
            <input
                type="text"
                name="imagen"
                placeholder="http://ejemplo.com/imagen.jpg"
                value={newBookData.imagen}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', border: '1px solid #ced4da', borderRadius: '4px' }}
            />
        </div>

        <button
            type="submit"
            style={{
                width: '100%',
                padding: '10px 15px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
                marginTop: '10px'
            }}
        >Agregar Libro</button>
        </form>
    </div>
    );
}

export default AddBookForm;
