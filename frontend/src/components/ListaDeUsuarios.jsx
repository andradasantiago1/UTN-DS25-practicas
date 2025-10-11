import { useFetch } from '../hooks/useFetch';
import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap'; 

function ListaDeUsuarios() {
	const { data, loading, error } = useFetch('/api/users', {}, { requireAuth: true });

	if (loading) return (
		<Container className="py-5 text-center">
			<p>Cargando usuarios...</p>
		</Container>
	);
	if (error) return (
		<Container className="py-5 text-center">
			<p className="text-danger">Error al cargar usuarios: {error.message || error}</p>
		</Container>
	); 
	
	const usersArray = data?.users || [];

	return (
		<Container className="py-5">
			<Row className="justify-content-center">
				<Col md={12} lg={10}>
					<Card className="shadow-sm">
						<Card.Header className="bg-primary text-white">
							<h2 className="mb-0 fs-4">Lista de Usuarios</h2>
						</Card.Header>
						<Card.Body>
							{usersArray.length > 0 ? (
								<ListGroup variant="flush">
									{usersArray.map(usuario => (
										<ListGroup.Item key={usuario.id} className="d-flex justify-content-between align-items-center">
											<div>
												<h5 className="mb-1">{usuario.name}</h5>
												<p className="mb-1 text-muted small">{usuario.email}</p>
											</div>
											<span className={`badge rounded-pill ${usuario.role === 'ADMIN' ? 'bg-danger' : 'bg-secondary'}`}>
												{usuario.role}
											</span>
										</ListGroup.Item>
									))}
								</ListGroup>
							) : (
								<p className="text-center">No se encontraron usuarios o la lista está vacía.</p>
							)}
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default ListaDeUsuarios;