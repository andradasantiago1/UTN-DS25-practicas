import React from 'react';
import Header from './Header';
import CustomNavbar from './Navbar'; 
import Footer from './Footer';
import { Container } from 'react-bootstrap';

function Layout({ children }) {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <CustomNavbar />
            <Container as="main" className="flex-grow-1 my-4">
                {children}
            </Container>
            <Footer />
        </div>
    );
}
export default Layout;