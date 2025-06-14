import React from 'react';
import Header from './Header';
import Navbar from './Navbar'; 
import Footer from './Footer'; 
import '../App.css'; 

function Layout({ children }) {
    return (
        <div id="contenedor"> 
            <Header /> 
            <Navbar /> 
            <div id="contenido"> {/*main */}
                {children}
            </div>
            <Footer /> 
        </div>
    );
}
export default Layout;
