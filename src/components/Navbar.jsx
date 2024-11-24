import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/agregar-producto">Agregar Producto</Link>
      <Link to="/listar-productos">Ver Producto</Link>
    </nav>
  );
}

export default Navbar;