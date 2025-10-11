import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Form, Button, Card } from 'react-bootstrap'; 

function AddBookForm({ onAddBook }) {
	const { user } = useAuth();
	const [newBookData, setNewBookData] = useState({
		titulo: '',
		autor: '',
		categoria: '',
		imagen: '',
		destacado: false,
	});

	const CATEGORIES = [
		"FANTASIA",
		"CIENCIA FICCION",
		"HISTORIA",
		"NOVELA",
	];

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setNewBookData({
			...newBookData,
			[name]: type === 'checkbox' ? checked : value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!newBookData.titulo.trim() || !newBookData.autor.trim() || !newBookData.categoria) {
			console.log('Por favor, completa el título, autor y categoría.');
			return;
		}

		if (!user || user.id === undefined) { 
			console.error("Error: Usuario no logueado o ID de usuario no disponible.");
			alert("Error de autenticación. Por favor, intenta de nuevo.");
			return;
		}

		const parsedUserId = parseInt(user.id, 10);
		
		if (isNaN(parsedUserId) || parsedUserId <= 0) {
			console.error("Error: ID de usuario inválido o no positivo.");
			alert("Error de validación del usuario.");
			return;
		}

		let bookDataToSend = {
			titulo: newBookData.titulo.trim(),
			autor: newBookData.autor.trim(),
			categoria: newBookData.categoria,
			destacado: newBookData.destacado,
			userId: parsedUserId,
		};

		if (newBookData.imagen.trim()) {
			bookDataToSend.imagen = newBookData.imagen.trim();
		} else {
			delete bookDataToSend.imagen;
		}

		console.log("Datos del libro a enviar:", bookDataToSend);
		
		onAddBook(bookDataToSend);

		setNewBookData({
			titulo: '',
			autor: '',
			categoria: '',
			imagen: '',
			destacado: false,
		});
	};

	return (
		<Card className="contact-card-small"> 
			<Card.Body>
				<Card.Title className="text-center mb-4">
					<h2 style={{ fontSize: '2rem', fontWeight: '700', margin: 0 }}>Agregar Nuevo Libro</h2>
				</Card.Title>
				<Form onSubmit={handleSubmit}>
					
					{/* TÍTULO */}
					<Form.Group className="mb-3" controlId="formBookTitle">
						<Form.Label>Título:</Form.Label>
						<Form.Control
							type="text"
							name="titulo"
							value={newBookData.titulo}
							onChange={handleChange}
							required
						/>
					</Form.Group>

					{/* AUTOR */}
					<Form.Group className="mb-3" controlId="formBookAuthor">
						<Form.Label>Autor:</Form.Label>
						<Form.Control
							type="text"
							name="autor"
							value={newBookData.autor}
							onChange={handleChange}
							required
						/>
					</Form.Group>

					{/* CATEGORÍA */}
					<Form.Group className="mb-3" controlId="formBookCategory">
						<Form.Label>Categoría:</Form.Label>
						<Form.Select
							name="categoria"
							value={newBookData.categoria}
							onChange={handleChange}
							required
						>
							<option value="">Selecciona una categoría...</option>
							{CATEGORIES.map(cat => (
								<option key={cat} value={cat}>{cat}</option> 
							))}
						</Form.Select>
					</Form.Group>

					{/* URL IMAGEN */}
					<Form.Group className="mb-3" controlId="formBookImage">
						<Form.Label>URL de la Imagen (opcional):</Form.Label>
						<Form.Control
							type="text"
							name="imagen"
							placeholder="http://ejemplo.com/imagen.jpg o ./css-img/..."
							value={newBookData.imagen}
							onChange={handleChange}
						/>
					</Form.Group>

					{/* DESTACADO */}
					<Form.Group className="mb-3" controlId="formBookDestacado">
						<Form.Check 
							type="checkbox"
							name="destacado"
							label="Marcar como Destacado"
							checked={newBookData.destacado}
							onChange={handleChange}
						/>
					</Form.Group>

					<Button 
						variant="primary" 
						type="submit"
						className="w-100" 
					>
						Agregar Libro
					</Button>
				</Form>
			</Card.Body>
		</Card>
	);
}

export default AddBookForm;