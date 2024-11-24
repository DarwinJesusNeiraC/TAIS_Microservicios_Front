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

      <h1>Agregar Producto</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="codigo" placeholder="Código" onChange={handleChange} required />
        <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
        <input type="text" name="descripcion" placeholder="Descripción" onChange={handleChange} required />
        <input type="number" name="cantidad" placeholder="Cantidad" onChange={handleChange} required />
        <input type="number" name="precio" placeholder="Precio" onChange={handleChange} required />
        <input type="text" name="categoria" placeholder="Categoría" onChange={handleChange} required />
        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
}

export default AgregarProducto;