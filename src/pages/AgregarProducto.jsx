import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirigir después de éxito
import '../styles/estiloAgregarProducto.css';
import Navbar from '../components/Navbar';
import config from '../config'; // Importar la configuración

function AgregarProducto() {
  const [producto, setProducto] = useState({
    codigo: '',
    nombre: '',
    descripcion: '',
    cantidad: '',
    precio_unitario: '',
    categoria: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(null); // Mensaje de éxito
  const navigate = useNavigate(); // Hook para redirigir después del éxito

  const validateField = (name, value) => {
    let error = '';
    if (name === 'cantidad') {
      const cantidad = Number(value);
      if (!Number.isInteger(cantidad) || cantidad <= 0) {
        error = 'Cantidad debe ser un número entero positivo.';
      }
    }
    if (name === 'precio_unitario') {
      const precio = Number(value);
      if (precio <= 0 || !/^\d+(\.\d{1,2})?$/.test(value)) {
        error = 'Precio unitario debe ser positivo y tener como máximo 2 decimales.';
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validar el campo y actualizar errores
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
    setProducto({ ...producto, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    for (const field in producto) {
      const error = validateField(field, producto[field]);
      if (error) {
        newErrors[field] = error;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('Por favor corrige los errores antes de enviar.');
      return;
    }

    const productoFinal = {
      ...producto,
      cantidad: parseInt(producto.cantidad, 10), // Convertir cantidad a entero
      precio_unitario: parseFloat(producto.precio_unitario), // Convertir precio_unitario a número decimal
    };

    try {
      const response = await fetch(`${config.API_BASE_URL}/productos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productoFinal),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        const { message } = result.data;

        // Mostrar mensaje de éxito
        setSuccessMessage(message);

        // Limpiar el formulario después de éxito
        setProducto({
          codigo: '',
          nombre: '',
          descripcion: '',
          cantidad: '',
          precio_unitario: '',
          categoria: '',
        });
        setErrors({});

        // Redirigir después de mostrar el mensaje
        setTimeout(() => {
          setSuccessMessage(null);
          navigate('/listar-productos'); // Redirigir a listar productos
        }, 2000);
      } else if (response.status === 400) {
        console.error('Error 400: Datos inválidos.');
        alert('Error: Datos inválidos. Por favor revisa los campos.');
      } else if (response.status === 409) {
        console.error('Error 409: Código duplicado.');
        alert('Error: El código del producto ya existe. Usa uno diferente.');
      } else {
        console.error('Error al crear el producto:', response.statusText);
        alert('Error al agregar el producto.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Hubo un error al enviar la solicitud.');
    }
  };

  return (
    <div className="containerFormulario">
      <Navbar />
      <div className="form-container">
        <h1>Agregar Producto</h1>
        {successMessage && <div className="success-message">{successMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="code">Código</label>
            <input
              type="text"
              id="codigo"
              name="codigo"
              value={producto.codigo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={producto.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <input
              type="text"
              id="descripcion"
              name="descripcion"
              value={producto.descripcion}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Cantidad</label>
            <input
              type="number"
              id="cantidad"
              name="cantidad"
              value={producto.cantidad}
              onChange={handleChange}
              required
            />
            {errors.cantidad && <span className="error-message">{errors.cantidad}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="price">Precio Unitario</label>
            <input
              type="number"
              id="precio_unitario"
              name="precio_unitario"
              value={producto.precio_unitario}
              onChange={handleChange}
              required
            />
            {errors.precio_unitario && <span className="error-message">{errors.precio_unitario}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="category">Categoría</label>
            <input
              type="text"
              id="categoria"
              name="categoria"
              value={producto.categoria}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-submit">
            Agregar Producto
          </button>
        </form>
      </div>
    </div>
  );
}

export default AgregarProducto;

