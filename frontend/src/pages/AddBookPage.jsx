import React from 'react';
import AddBookForm from '../components/AddBookForm';
import { getToken } from '../helpers/auth';
const BASE_URL = 'http://localhost:3000';

function AddBookPage() {
	const handleAddBook = async (bookData) => {
		try {
			const token = getToken();
			
			const res = await fetch(`${BASE_URL}/api/books`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`, 
				},
				body: JSON.stringify(bookData),
			});

			if (res.status === 401) {
				console.error("No autorizado. Token inválido o expirado.");
				return;
			}
			
			if (!res.ok) {
				throw new Error(`Error al crear el libro: ${res.status} ${res.statusText}`);
			}
			
			const result = await res.json();
			console.log("Libro agregado con éxito:", result);
			alert("Libro agregado con éxito!");
			
		} catch (error) {
			console.error("Error en la petición de agregar libro:", error);
			alert(`Fallo al agregar libro: ${error.message}`);
		}
	};

	return (
		<div className="add-book-page">
			<AddBookForm onAddBook={handleAddBook} />
		</div>
	);
}

export default AddBookPage;