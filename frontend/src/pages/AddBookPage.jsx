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
				alert("No autorizado. Por favor, vuelve a iniciar sesión.");
				return;
			}
			
			if (!res.ok) {
				// Conservamos el manejo de errores robusto para obtener detalles del 400
				let errorMessage = `Error al crear el libro: ${res.status} ${res.statusText}`;
				try {
					const clonedRes = res.clone();
					const errorResult = await clonedRes.json();
					errorMessage = errorResult.message || errorResult.error || JSON.stringify(errorResult);
				} catch (e) {
					try {
						errorMessage += ": " + (await res.text());
					} catch (textError) {
						// Si todo falla, se mantiene el mensaje HTTP.
					}
				}
				throw new Error(errorMessage); 
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