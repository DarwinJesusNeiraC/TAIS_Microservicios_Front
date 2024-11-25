import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

function ModificarProducto() {
  const { codigo } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const opcion = new URLSearchParams(location.search).get('opcion'); // 'agregar' o 'retirar'

  const [cantidad, setCantidad] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(cantidad) > 0) {
      navigate(`/resumen-producto/${codigo}?opcion=${opcion}&cantidad=${cantidad}`);
    } else {
      alert('Por favor, ingrese un valor positivo.');
    }
  };

  return (
    <div>
      <Navbar />
      <h1>{opcion === 'agregar' ? 'Agregar' : 'Retirar'} Producto: {codigo}</h1>
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
        <button type="submit">Aceptar</button>
      </form>
    </div>
  );
}

export default ModificarProducto;
