import React, { useState, useEffect } from 'react';
import '../styles/estiloListarProductos.css'; // Crear este archivo para estilos
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import config from '../config'; // Importar la configuración

function ListarProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga
  const [error, setError] = useState(null); // Para manejar errores
  const navigate = useNavigate();

  // Simulación de carga de datos del backend
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        // Realiza la llamada al backend para obtener los productos
        const response = await fetch(`${config.API_BASE_URL}/productos`); // Asegúrate de que el endpoint sea correcto
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
        const responseData = await response.json();

        if (!responseData.success) {
          throw new Error('El servidor devolvió un error en la respuesta');
        }

        // Normaliza los datos para garantizar consistencia
        const productosNormalizados = responseData.data.map((producto) => ({
          ...producto,
          precio_unitario: parseFloat(producto.precio_unitario), // Convertir precio a número
          cantidad: parseFloat(producto.cantidad), // Convertir cantidad a número
        }));

        setProductos(productosNormalizados);
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
            <p><strong>Precio Unitario:</strong> ${producto.precio_unitario.toFixed(2)}</p>
            <p><strong>Categoría:</strong> {producto.categoria}</p>
            <button
              className="btn-gestionar"
              onClick={() =>
                navigate(`/modificar-producto/${producto.codigo}`, {
                  state: {
                    producto,
                  },
                })
              }
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
