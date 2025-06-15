import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
function Footer() {
    return (
        <footer className="bg-dark text-white py-3 mt-auto">
            <Container className="text-center">
                <Row className="justify-content-center align-items-center mb-2">
                    <Col xs={12} md={8} lg={6}>
                        <Nav className="justify-content-center">
                            <Nav.Link href="https://www.instagram.com/yenny_elateneo/?hl=es-la" className="text-white text-decoration-none px-2">Instagram</Nav.Link>
                            <Nav.Link href="https://www.facebook.com/yenny.elateneo" className="text-white text-decoration-none px-2">Facebook</Nav.Link>
                            <Nav.Link href="https://www.youtube.com/quidcanalcultural" className="text-white text-decoration-none px-2">YouTube</Nav.Link>
                        </Nav>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs={12} md={10} lg={8}>
                        <p className="mb-0">Copyright Yenny - El Ateneo - 30654386192 - 2025. Todos los derechos reservados.</p>
                        <p className="mb-0"><Link to="/terminos-y-condiciones" className="text-white text-decoration-none">Términos y condiciones</Link></p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}
export default Footer;
