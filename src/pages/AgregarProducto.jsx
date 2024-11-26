import React, { useState } from 'react';
import '../styles/estiloAgregarProducto.css';
import Navbar from '../components/Navbar';

function AgregarProducto() {
  const [producto, setProducto] = useState({
    codigo: '',
    nombre: '',
    descripcion: '',
    cantidad: '',
    precio_unitario: '',
    categoria: ''
  });

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

    // Enviar datos al backend
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('http://localhost:5000/productos', { // url
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(producto),
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
          alert('Producto agregado con éxito!');
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
          </div>
          <div className="form-group">
            <label htmlFor="price">Precio Unitario</label>
            <input type="number" id="precio_unitario" name="precio_unitario" onChange={handleChange} required />
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
