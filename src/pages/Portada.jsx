import React from 'react';
import '../styles/estiloPortada.css';  // Si estás utilizando estilos específicos
import Navbar from '../components/Navbar';

function Portada() {
  return (
    <div>
      <header className="imagen">
        <div className="sobreimagen">

          <div className="text-contenido">
            <h1>Gestión de Inventarios</h1>
            <p>Gestiona tus productos</p>
            <a href="/listar-productos" className="boton-catalogo">Ver Catálogo de Productos</a>
          </div>
        </div>
      </header>

      <section className="servicios">
        <div className="containerPortada">
          <h2>Registrar Producto</h2>
          <div className="servicios-grid">
            <div className="servicios-item">
              <img src="src/img/imagen_portada.png" alt="Actualiza" />
              
              <button className="btn-funciones" onClick={() => window.location.href = '/agregar-producto'}>
                Registrar Producto
                </button>  
              <p>Ingresa los datos de los produstos</p>
            </div>
            <div className="servicios-item">
              <img src="src/img/imagen_portada.png" alt="Actualiza" />
              
              <button className="btn-funciones" onClick={() => window.location.href = '/listar-productos'}>
                Actualizar Producto
              </button>
              <p>Actualiza los ingresos y salidas de los productos.</p>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>&copy; 2024 Gestión de Inventarios - Equipo 08.</p>
      </footer>
    </div>
  );
}

export default Portada;
