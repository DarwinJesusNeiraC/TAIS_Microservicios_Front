import React, { useState, useEffect } from 'react';
import '../styles/estiloListarProductos.css'; // Crear este archivo para estilos
import Navbar from '../components/Navbar';

function ListarProductos() {
  const [productos, setProductos] = useState([]);

  // Simulación de carga de datos del backend
  useEffect(() => {
    // Llamada al backend (aquí simulamos con datos estáticos)
    const fetchProductos = async () => {
      // Reemplaza con tu endpoint real, como `http://localhost:5000/api/productos`
      const data = [
        { codigo: '001', nombre: 'Producto 1', descripcion: 'Descripción 1', cantidad: 10, precio: 100, categoria: 'Categoría 1' },
        { codigo: '002', nombre: 'Producto 2', descripcion: 'Descripción 2', cantidad: 20, precio: 200, categoria: 'Categoría 2' },
      ];
      setProductos(data);
    };

    fetchProductos();
  }, []);

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
            <p><strong>Precio:</strong> ${producto.precio}</p>
            <p><strong>Categoría:</strong> {producto.categoria}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListarProductos;