import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function ProductoDetalle() {
  const { codigo } = useParams();
  const navigate = useNavigate();

  const handleOption = (opcion) => {
    navigate(`/modificar-producto/${codigo}?opcion=${opcion}`);
  };

  return (
    <div>
      <Navbar />
      <h1>Gestión del Producto: {codigo}</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <button onClick={() => handleOption('agregar')}>Agregar Producto</button>
        <button onClick={() => handleOption('retirar')}>Retirar Producto</button>
      </div>
    </div>
  );
}

export default ProductoDetalle;
