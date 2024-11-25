import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

function ResumenProducto() {
  const { codigo } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const opcion = new URLSearchParams(location.search).get('opcion'); // 'agregar' o 'retirar'
  const cantidad = parseInt(new URLSearchParams(location.search).get('cantidad'));

  // Simulación de producto y operación
  const producto = {
    codigo: codigo,
    nombre: 'Producto Simulado',
    cantidadActual: 100, // Supongamos que esta es la cantidad inicial
  };

  const nuevaCantidad =
    opcion === 'agregar'
      ? producto.cantidadActual + cantidad
      : producto.cantidadActual - cantidad;

  return (
    <div>
      <Navbar />
      <h1>Resumen de la Operación</h1>
      <p><strong>Producto:</strong> {producto.nombre}</p>
      <p><strong>Código:</strong> {producto.codigo}</p>
      <p><strong>Cantidad Anterior:</strong> {producto.cantidadActual}</p>
      <p><strong>Cantidad {opcion === 'agregar' ? 'Agregada' : 'Retirada'}:</strong> {cantidad}</p>
      <p><strong>Cantidad Actual:</strong> {nuevaCantidad}</p>
      <button onClick={() => navigate('/listar-productos')}>Volver a Lista de Productos</button>
    </div>
  );
}

export default ResumenProducto;
