import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function ProductoDetalle() {
  const { codigo } = useParams(); // Obtener el código del producto desde la URL
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null); // Estado para almacenar los detalles del producto
  const [error, setError] = useState(null); // Estado para manejar errores

  // Función para obtener los detalles del producto desde el backend
  const obtenerProducto = async () => {
    try {
      const response = await fetch(`http://localhost:5000/productos?codigo=${codigo}`);
      if (!response.ok) {
        throw new Error('Error al obtener el producto');
      }
      const data = await response.json();
      if (data.length > 0) {
        setProducto(data[0]); // Suponiendo que la respuesta devuelva un arreglo
      } else {
        setError('Producto no encontrado');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // useEffect para ejecutar el GET cuando se carga el componente
  useEffect(() => {
    obtenerProducto();
  }, [codigo]); // Se ejecuta cuando cambia el `codigo`

  const handleOption = (opcion) => {
    // Redirige a la página de modificación con la opción seleccionada
    navigate(`/modificar-producto/${codigo}?opcion=${opcion}`);
};

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!producto) {
    return <div>Cargando producto...</div>;
  }

  return (
    <div>
      <Navbar />
      <h1>Gestión del Producto: {producto.nombre}</h1> {/* Mostrar nombre del producto */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <button onClick={() => handleOption('agregar')}>Agregar Producto</button>
        <button onClick={() => handleOption('retirar')}>Retirar Producto</button>
      </div>
    </div>
  );
}

export default ProductoDetalle;
