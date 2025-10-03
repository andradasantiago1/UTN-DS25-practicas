import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../helpers/auth";
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';

export default function LoginPage() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const res = await fetch("http://localhost:3000/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			if (!res.ok) {
				throw new Error("Error en login");
			}
			const { data } = await res.json();
			setToken(data.token);
			navigate("/catalogo");
		} catch (err) {
			alert("Login fallido");
		}
	}

	return (
		<Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
			<Row className="justify-content-center w-100">
				<Col md={6}>
					<Card className="p-4 shadow">
						<Card.Body>
							<h2 className="text-center mb-4">Login</h2>
							<Form onSubmit={handleSubmit}>
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Label>Email</Form.Label>
									<Form.Control
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="Ingrese su email"
										required
									/>
								</Form.Group>

								<Form.Group className="mb-3" controlId="formBasicPassword">
									<Form.Label>Contraseña</Form.Label>
									<Form.Control
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										placeholder="Ingrese su contraseña"
										required
									/>
								</Form.Group>

								<Button variant="primary" type="submit" className="w-100">
									Ingresar
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}