import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function NotaDetalle() {
  const location = useLocation();
  const navigate = useNavigate();

  // Recuperar el estado pasado desde navigate
  const { nota, product } = location.state || {};

  if (!nota || !product) {
    return (
      <div>
        <Navbar />
        <h1>Error</h1>
        <p>No se encontraron datos de la operación.</p>
        <button onClick={() => navigate(-1)}>Volver</button>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <h1>Detalle de la Nota</h1>
      <div>
        <h2>Información de la Nota</h2>
        <p><strong>ID Nota:</strong> {nota.id}</p>
        <p><strong>Fecha:</strong> {nota.fecha}</p>
        <p><strong>Tipo:</strong> {nota.tipo}</p>
        <p><strong>Cantidad:</strong> {nota.cantidad}</p>
        <p><strong>Creado en:</strong> {nota.createdAt}</p>
      </div>
      <div>
        <h2>Información del Producto</h2>
        <p><strong>Código:</strong> {product.codigo}</p>
        <p><strong>Cantidad Previa:</strong> {product.previousQuantity}</p>
        <p><strong>Cantidad Nueva:</strong> {product.newQuantity}</p>
      </div>
      <button onClick={() => navigate('/listar-productos')}>Volver</button>
    </div>
  );
}

export default NotaDetalle;
