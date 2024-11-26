import React, { useState, useEffect } from 'react';
import '../styles/estiloListarProductos.css'; // Crear este archivo para estilos
import Navbar from '../components/Navbar';

function ListarProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga
  const [error, setError] = useState(null); // Para manejar errores

  // Simulación de carga de datos del backend
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        // Realiza la llamada al backend para obtener los productos
        const response = await fetch('http://localhost:5000/productos'); // Asegúrate de que el endpoint sea correcto
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Deja de cargar
      }
    };

    fetchProductos();
  }, []);

  if (loading) {
    return <div>Cargando productos...</div>; // Puedes poner un spinner o un mensaje de carga
  }

  if (error) {
    return <div>Error: {error}</div>; // Muestra un error si la llamada falla
  }

  return (
    <div className="containerListar">

    <Navbar />

      <h1>Lista de Productos</h1>
      <div className="productos-grid">
        {productos.map((producto, index) => (
          <div key={index} className="producto-item">
            <h3>{producto.nombre}</h3>
            <p><strong>Código:</strong> {producto.codigo}</p>
            <p><strong>Descripción:</strong> {producto.descripcion}</p>
            <p><strong>Cantidad:</strong> {producto.cantidad}</p>
            <p><strong>Precio Unitario:</strong> ${producto.precio_unitario}</p>
            <p><strong>Categoría:</strong> {producto.categoria}</p>
            <button
              className="btn-gestionar"
              onClick={() => window.location.href = `/producto/${producto.codigo}`}
            >
              Gestionar Producto
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListarProductos;