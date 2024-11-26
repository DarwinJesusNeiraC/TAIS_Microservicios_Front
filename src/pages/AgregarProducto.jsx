import React, { useState } from 'react';
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
    categoria: ''
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';
    if (name === 'cantidad') {
      const cantidad = Number(value);
      if (!Number.isInteger(cantidad) || cantidad < 0) {
        error = 'Cantidad debe ser un número entero positivo.';
      }
    }
    if (name === 'precio_unitario') {
      const precio = Number(value);
      if (precio < 0 || !/^\d+(\.\d{1,2})?$/.test(value)) {
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
    setProducto({ ...producto, [e.target.name]: e.target.value });
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

  // Enviar datos al backend
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
      const response = await fetch(`${config.API_BASE_URL}/productos`, { // url
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productoFinal),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Producto creado exitosamente:', result);
        // Opcional: limpiar el formulario
        setProducto({
          codigo: '',
          nombre: '',
          descripcion: '',
          cantidad: '',
          precio_unitario: '',
          categoria: ''
        });
        setErrors({});
        alert('Producto agregado con éxito!');
      } else if (response.status === 400) {
        const errorData = await response.json();
        console.error('Error 400:', errorData.error);
        alert('Error: Datos inválidos. Por favor revisa los campos.');
      } else if (response.status === 409) {
        const errorData = await response.json();
        console.error('Error 409:', errorData.error);
        alert('Error: El código del producto ya existe. Por favor usa uno diferente.');
      }
      else {
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
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="code">Código</label>
            <input type="text" id="codigo" name="codigo" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" id="nombre" name="nombre" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <input type="text" id="descripcion" name="descripcion" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Cantidad</label>
            <input type="number" id="cantidad" name="cantidad" onChange={handleChange} required />
            {errors.cantidad && <span className="error-message">{errors.cantidad}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="price">Precio Unitario</label>
            <input type="number" id="precio_unitario" name="precio_unitario" onChange={handleChange} required />
            {errors.precio_unitario && <span className="error-message">{errors.precio_unitario}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="category">Categoría</label>
            <input type="text" id="categoria" name="categoria" onChange={handleChange} required />
          </div>
          <button type="submit" className="btn-submit">Agregar Producto</button>
        </form>
      </div>
    </div>
  );
}

export default AgregarProducto;
