import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import config from '../config'; // Importar la configuración

function ModificarProducto() {
  const { codigo } = useParams(); // Extrae el código del producto desde la URL
  const location = useLocation(); // Obtiene el estado pasado desde navigate
  const navigate = useNavigate(); // Para redirigir después de aceptar

  const producto = location.state?.producto; // Recupera el producto desde el estado
  const [cantidad, setCantidad] = useState('');
  const [opcion, setOpcion] = useState(''); // Estado para definir la opción (agregar o disminuir)
  const [errors, setErrors] = useState({}); // Errores de validación

  // Validar la cantidad ingresada
  const validateCantidad = (value) => {
    let error = '';
    const cantidadNumerica = Number(value);

    if (!value) {
      error = 'La cantidad es requerida.';
    } else if (!Number.isInteger(cantidadNumerica) || cantidadNumerica <= 0) {
      error = 'La cantidad debe ser un número entero positivo.';
    }
    return error;
  };

  const handleCantidadChange = (e) => {
    const value = e.target.value;
    const error = validateCantidad(value);
    setCantidad(value);
    setErrors({ ...errors, cantidad: error });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateCantidad(cantidad);
    if (!opcion) {
      alert('Por favor selecciona una acción (Agregar o Disminuir).');
      return;
    }
    if (error) {
      setErrors({ ...errors, cantidad: error });
      return;
    }

    const cantidadNumerica = parseInt(cantidad, 10);

    const fechaActual = new Date().toISOString(); // Fecha actual en formato ISO
    const payload = {
      fecha: fechaActual,
      codigo: producto.codigo,
      cantidad: cantidadNumerica,
    };

    const endpoint =
      opcion === 'agregar'
        ? `${config.API_BASE_URL_INVENTARIO}/inventario/nota_entrada`
        : `${config.API_BASE_URL_INVENTARIO}/inventario/nota_salida`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        const { data } = result;

        // Redirigir a NotaDetalle pasando la nota y los detalles del producto
        navigate('/nota-detalle', { state: { nota: data.nota, product: data.product } });
      } else {
        alert('Error: No se pudo completar la operación.');
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      alert('Hubo un error al enviar la solicitud.');
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
        <div className="form-group">
          <label htmlFor="cantidad">Cantidad:</label>
          <input
            id="cantidad"
            type="number"
            value={cantidad}
            onChange={handleCantidadChange}
            required
            min="1"
          />
          {errors.cantidad && <span className="error-message">{errors.cantidad}</span>}
        </div>

        <div className="action-buttons">
          <button
            type="button"
            className={opcion === 'agregar' ? 'btn-selected' : ''}
            onClick={() => setOpcion('agregar')}
          >
            Agregar
          </button>
          <button
            type="button"
            className={opcion === 'disminuir' ? 'btn-selected' : ''}
            onClick={() => setOpcion('disminuir')}
          >
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
