import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Portada from './pages/Portada';
import AgregarProducto from './pages/AgregarProducto';
import ListarProductos from './pages/ListarProductos';

function App() {
  return (
    <Routes>
      {/* Ruta principal (Portada) */}
      <Route path="/" element={<Portada />} />
      
      {/* Ruta para agregar productos */}
      <Route path="/agregar-producto" element={<AgregarProducto />} />
      <Route path="/listar-productos" element={<ListarProductos />} />
    </Routes>
  );
}

export default App;