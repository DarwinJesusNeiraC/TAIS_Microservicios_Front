import React, { useState } from 'react';
import '../styles/estiloAgregarProducto.css';
import Navbar from '../components/Navbar';

function AgregarProducto() {
  const [producto, setProducto] = useState({
    codigo: '',
    nombre: '',
    descripcion: '',
    cantidad: '',
    precio: '',
    categoria: ''
  });

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Producto agregado:', producto);
    // Aquí podrías enviar los datos al backend
  };

  return (
    <div className="containerFormulario">
      <Navbar />
      <div className="form-container">
        <h1>Agregar Producto</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="code">Código</label>
            <input type="text" id="code" name="code" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" name="name" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <input type="text" id="description" name="description" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Cantidad</label>
            <input type="number" id="amount" name="amount" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="price">Precio</label>
            <input type="number" id="price" name="price" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="category">Categoría</label>
            <input type="text" id="category" name="category" onChange={handleChange} required />
          </div>
          <button type="submit" className="btn-submit">Agregar Producto</button>
        </form>
      </div>
    </div>
  );
}

export default AgregarProducto;
