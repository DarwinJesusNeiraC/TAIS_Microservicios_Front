import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Portada from './pages/Portada';
import AgregarProducto from './pages/AgregarProducto';
import ListarProductos from './pages/ListarProductos';
import ProductoDetalle from './pages/ProductoDetalle';
import ModificarProducto from './pages/ModificarProducto';
import ResumenProducto from './pages/ResumenProducto';

function App() {
  return (
    <Routes>
      {/* Ruta principal (Portada) */}
      <Route path="/" element={<Portada />} />

      {/* Ruta para agregar productos */}
      <Route path="/agregar-producto" element={<AgregarProducto />} />
      <Route path="/listar-productos" element={<ListarProductos />} />
      <Route path="/producto/:codigo" element={<ProductoDetalle />} />
      <Route path="/modificar-producto/:codigo" element={<ModificarProducto />} />
      <Route path="/resumen-producto/:codigo" element={<ResumenProducto />} />

    </Routes>
  );
}

export default App; 