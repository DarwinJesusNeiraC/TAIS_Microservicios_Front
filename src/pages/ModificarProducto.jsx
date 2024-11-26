import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';


function ModificarProducto() {
  const { codigo } = useParams();  // Extrae el código del producto desde la URL
  const location = useLocation();  // Obtiene los parámetros de la URL
  const navigate = useNavigate();  // Para redirigir después de aceptar
  const opcion = new URLSearchParams(location.search).get('opcion'); // 'agregar' o 'retirar'

  const [producto, setProducto] = useState(null);  // Estado para el producto seleccionado
  const [cantidad, setCantidad] = useState(0);     // Estado para la cantidad ingresada
  const [loading, setLoading] = useState(true);    // Estado de carga
  const [error, setError] = useState(null);        // Estado de error

  // Cargar los datos del producto desde la API
  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch(`http://localhost:5000/productos/${codigo}`); // Endpoint correcto
        if (!response.ok) {
          throw new Error('Error al obtener el producto');
        }
        const data = await response.json();  // Obtener datos del producto
        setProducto(data);  // Guardar en el estado
      } catch (error) {
        setError(error.message);  // Manejar errores
      } finally {
        setLoading(false);  // Finalizar carga
      }
    };

    fetchProducto();
  }, [codigo]);  // Se ejecuta cuando cambia el código del producto

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(cantidad) > 0) {
      navigate(`/resumen-producto/${codigo}?opcion=${opcion}&cantidad=${cantidad}`);
    } else {
      alert('Por favor, ingrese un valor positivo.');
    }
  };

  return (
    <div>
      <Navbar />
      <h1>{opcion === 'agregar' ? 'Agregar' : 'Retirar'} Producto: {producto.nombre}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cantidad">Cantidad:</label>
        <input
          id="cantidad"
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          required
          min="1"
        />
        <button type="submit">Aceptar</button>
      </form>
    </div>
  );
}

export default ModificarProducto;
