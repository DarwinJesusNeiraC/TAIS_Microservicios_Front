// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import Navbar from '../components/Navbar';

// function ModificarProducto() {
//   const { codigo } = useParams(); // Extrae el código del producto desde la URL
//   const location = useLocation(); // Obtiene los parámetros de la URL
//   const navigate = useNavigate(); // Para redirigir después de aceptar
//   const opcion = new URLSearchParams(location.search).get('opcion'); // 'agregar' o 'retirar'
//   const cantidadInicial = parseInt(new URLSearchParams(location.search).get('cantidad')); // Cantidad actual del producto

//   //const [producto, setProducto] = useState(null); // Estado para el producto seleccionado
//   //const [cantidad, setCantidad] = useState(cantidadInicial || 0); // Estado para la cantidad ingresada
//   const [loading, setLoading] = useState(true); // Estado de carga
//   const [error, setError] = useState(null); // Estado de error
//   const producto = location.state?.producto; // Recupera el objeto del estado
//   const [cantidad, setCantidad] = useState(producto?.cantidad || 0);

//   // Cargar los datos del producto desde la API
//   useEffect(() => {
//     const fetchProducto = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/productos?codigo=${codigo}`); // Endpoint correcto
//         if (!response.ok) {
//           throw new Error('Error al obtener el producto');
//         }
//         const data = await response.json(); // Obtener datos del producto
//         if (data.length > 0) {
//           setProducto(data[0]); // Guardar en el estado
//         } else {
//           setError('Producto no encontrado');
//         }
//       } catch (error) {
//         setError(error.message); // Manejar errores
//       } finally {
//         setLoading(false); // Finalizar carga
//       }
//     };

//     fetchProducto();
//   }, [codigo]); // Se ejecuta cuando cambia el código del producto

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validar cantidad positiva
//     const cantidadNumerica = parseInt(cantidad);
//     if (cantidadNumerica <= 0) {
//       alert('Por favor, ingrese un valor positivo.');
//       return;
//     }

//     try {
//       const nuevaCantidad =
//         opcion === 'agregar'
//           ? parseInt(producto.cantidad) + cantidadNumerica
//           : parseInt(producto.cantidad) - cantidadNumerica;

//       if (nuevaCantidad < 0) {
//         alert('La cantidad no puede ser negativa.');
//         return;
//       }

//       // Realizar la petición PATCH al servidor
//       const response = await fetch(`http://localhost:5000/productos/${producto.id}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ cantidad: nuevaCantidad }),
//       });

//       if (!response.ok) {
//         throw new Error('Error al actualizar la cantidad del producto.');
//       }

//       const productoActualizado = await response.json();
//       alert('Producto actualizado exitosamente.');
//       setProducto(productoActualizado); // Actualizar el producto en el estado

//       // Redirigir después de actualizar
//       navigate(`/resumen-producto/${codigo}?opcion=${opcion}`); // Cambia esto a la ruta deseada después de la actualización
//     } catch (error) {
//       alert(`Error: ${error.message}`);
//     }
//   };

//   if (loading) {
//     return <div>Cargando producto...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <Navbar />
//       <h1>{opcion === 'agregar' ? 'Agregar' : 'Retirar'} Producto</h1>
//       {producto && (
//         <div>
//           <h2>Información del Producto</h2>
//           <p><strong>Código:</strong> {producto.codigo}</p>
//           <p><strong>Nombre:</strong> {producto.nombre}</p>
//           <p><strong>Cantidad Actual:</strong> {producto.cantidad}</p>
//         </div>
//       )}
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="cantidad">Cantidad:</label>
//         <input
//           id="cantidad"
//           type="number"
//           value={cantidad}
//           onChange={(e) => setCantidad(e.target.value)}
//           required
//           min="1"
//         />
//         <button type="submit">{opcion === 'agregar' ? 'Agregar' : 'Retirar'}</button>
//       </form>
//     </div>
//   );
// }

// export default ModificarProducto;
import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import config from '../config'; // Importar la configuración

function ModificarProducto() {
  const { codigo } = useParams(); // Extrae el código del producto desde la URL
  const location = useLocation(); // Obtiene el estado pasado desde navigate
  const navigate = useNavigate(); // Para redirigir después de aceptar

  const producto = location.state?.producto; // Recupera el producto desde el estado
  const [cantidad, setCantidad] = useState(producto?.cantidad || 0); // Cantidad inicial
  const [opcion, setOpcion] = useState(''); // Estado para definir la opción (agregar o disminuir)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!opcion) {
      alert('Por favor, selecciona una acción (Agregar o Disminuir).');
      return;
    }

    const cantidadNumerica = parseInt(cantidad);
    if (cantidadNumerica <= 0) {
      alert('Por favor, ingrese un valor positivo.');
      return;
    }

    try {
      const nuevaCantidad =
        opcion === 'agregar'
          ? producto.cantidad + cantidadNumerica
          : producto.cantidad - cantidadNumerica;

      if (nuevaCantidad < 0) {
        alert('La cantidad no puede ser negativa.');
        return;
      }

      const payload = {
        cantidad: nuevaCantidad,
        codigo: producto.codigo,
      };

      const response = await fetch(
        `${config.API_BASE_URL}/productos/${codigo}`, // Usa el ID del producto
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error('Error al actualizar la cantidad del producto.');
      }

      alert('Producto actualizado exitosamente.');
      //navigate(`/resumen-producto/${codigo}`); // Redirigir a la página de resumen
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  if (!producto) {
    return <div>Error: No se encontró el producto.</div>;
  }

  return (
    <div>
      <Navbar />
      <h1>Gestionar Producto</h1>
      <div>
        <h2>Información del Producto</h2>
        <p><strong>Código:</strong> {producto.codigo}</p>
        <p><strong>Nombre:</strong> {producto.nombre}</p>
        <p><strong>Cantidad Actual:</strong> {producto.cantidad}</p>
      </div>
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

        <div>
          <button type="button" onClick={() => setOpcion('agregar')}>
            Agregar
          </button>
          <button type="button" onClick={() => setOpcion('disminuir')}>
            Disminuir
          </button>
        </div>

        <button type="submit" disabled={!opcion}>
          Confirmar
        </button>
      </form>
    </div>
  );
}

export default ModificarProducto;
