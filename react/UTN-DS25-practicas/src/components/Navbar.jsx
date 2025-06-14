import React from 'react';
import { Link } from 'react-router-dom'; 

function Navbar() {
    return (
        <div id="menu">
            <ul>
                <li><Link to="/">Inicio</Link></li> 
                <li><Link to="/ciencia-ficcion">Ciencia Ficción</Link></li>
                <li><Link to="/historia">Historia</Link></li>
                <li><Link to="/novelas">Novelas</Link></li>
                <li><Link to="/fantasia">Fantasía</Link></li>
                <li><Link to="/registracion">Registración</Link></li>
                <li><Link to="/contacto">Contacto</Link></li>
            </ul>
        </div>
    );
}
export default Navbar;