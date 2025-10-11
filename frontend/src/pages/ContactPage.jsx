import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { contactSchema } from '../validations/contactSchema';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'; 

function ContactPage () {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset
	} = useForm({
		resolver: yupResolver(contactSchema)
	});
	const onSubmit = (data) => {
		alert(`Mensaje enviado por ${data.name}`);
		reset();
	};
	return (
		<Container className="my-5">
			
			<Row className="mb-4">
				<Col xs={12}>
					<h1 className="category-title mb-1">
						Contacto
					</h1>
				</Col>
			</Row>

			<Row className="justify-content-center">
				<Col xs={12} sm={10} md={8} lg={5}>
					<Card className="shadow-lg border-0 p-4 contact-card-small" style={{ borderRadius: '1rem', backgroundColor: '#ffffff' }}>
						<Card.Body className="p-4">
							
							<h4 className="mb-4 text-center h4 text-primary">Envíanos tu consulta</h4>
							
							<Form onSubmit={handleSubmit(onSubmit)}>
								<Form.Group className="mb-3">
									<Form.Control
										{...register("name")}
										type="text"
										placeholder="Tu nombre"
										className={errors.name ? "is-invalid" : ""}
										size="md"
									/>
									{errors.name && <Form.Control.Feedback type="invalid">{errors.name.message}</Form.Control.Feedback>}
								</Form.Group>
								<Form.Group className="mb-3">
									<Form.Control
										{...register("email")}
										type="email"
										placeholder="Tu email"
										className={errors.email ? "is-invalid" : ""}
										size="md"
									/>
									{errors.email && <Form.Control.Feedback type="invalid">{errors.email.message}</Form.Control.Feedback>}
								</Form.Group>
								<Form.Group className="mb-4">
									<Form.Control
										{...register("message")}
										as="textarea"
										placeholder="Tu mensaje"
										rows={4}
										className={errors.message ? "is-invalid" : ""}
										size="md"
									/>
									{errors.message && (
										<Form.Control.Feedback type="invalid">{errors.message.message}</Form.Control.Feedback>
									)}
								</Form.Group>
								<Button 
									type="submit" 
									disabled={isSubmitting}
									variant="primary"
									size="lg"
									className="w-100 mb-4"
								>
									{isSubmitting ? "Enviando..." : "Enviar Mensaje"}
								</Button>
							</Form>
							<div className="text-center small text-muted pt-3 border-top">
								<p className="mb-1">
									Mi Librería S.A.
								</p>
								<p className="mb-0">
									<span className="me-2">Av.60 esq. 126</span> | 
									<span className="ms-2">info@milibreria.com</span>
								</p>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default ContactPage;