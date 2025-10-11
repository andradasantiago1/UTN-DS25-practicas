import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const getImageUrl = (imagePath) => {
	if (imagePath && imagePath.startsWith('./css-img/')) {
		return imagePath.substring(1); 
	}
	return imagePath; 
};


function BookCard({ book }) { 
	const { imagen, titulo, autor, categoria } = book || {}; 
	const [imageError, setImageError] = useState(false); 

	const categoryPath = (categoria || '').toLowerCase().replace(/[\s_]+/g, '-');
	
	const finalImageUrl = getImageUrl(imagen);

	const showPlaceholder = !finalImageUrl || imageError;

	return (
		<Link to={`/category/${categoryPath}`} className="text-decoration-none text-dark professional-card">
			<Card className="h-100" style={{
				width: '15rem', 
				margin: '1rem',
				borderRadius: '0.75rem', 
				boxShadow: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.15)', 
				display: 'flex',
				flexDirection: 'column',
				overflow: 'hidden',
			}}>
				{showPlaceholder ? (
					<div className="book-placeholder"> 
						<div className="book-placeholder-content">
							{titulo ? <span>{titulo}</span> : <span>Sin Título</span>}
						</div>
					</div>
				) : (
					<Card.Img
						variant="top"
						src={finalImageUrl}
						alt={`Portada de ${titulo}`}
						style={{
							width: '100%',
							height: '16rem',
							objectFit: 'cover',
							padding: '10px 10px 0 10px', 
							borderRadius: '0.75rem 0.75rem 0 0',
						}}
						onError={() => {
							setImageError(true);
						}}
					/>
				)}

				<Card.Body style={{
					display: 'flex',
					flexDirection: 'column',
					flexGrow: 1,
					padding: '0.8rem 1rem', 
					textAlign: 'center'
				}}>
					<Card.Title style={{
						fontSize: '1rem', 
						fontWeight: 'bold',
						marginBottom: '0.1rem',
						height: '2.4em', 
						overflow: 'hidden',
						lineHeight: '1.2em',
						color: '#333'
					}}>
						{titulo}
					</Card.Title>
					<Card.Text className="mb-2" style={{
						fontSize: '0.95rem',
						fontWeight: '500',
						color: '#444'
					}}>
						{autor}
					</Card.Text>
					<Button 
						variant="primary" 
						style={{ 
							marginTop: 'auto', 
							backgroundColor: '#007bff', 
							borderColor: '#007bff',
							fontWeight: '600'
						}}>
						Ver Detalles
					</Button>
				</Card.Body>
			</Card>
		</Link>
	);
}

export default BookCard;