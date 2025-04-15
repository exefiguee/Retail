// src/components/Sidebar.tsx
import React, { useState, useMemo } from "react";

const Sidebar = ({
  onFilterChange,
}: {
  onFilterChange: (filters: any) => void;
}) => {
  const [brand, setBrand] = useState("");
  const [status, setStatus] = useState("");

  // Memorizar el objeto filters solo cuando brand o status cambian
  const filters = useMemo(() => {
    return {
      brand,
      status: status.split(",").map((s) => s.trim()),
    };
  }, [brand, status]); // Dependencias: solo recalcular cuando brand o status cambian

  const handleSubmit = () => {
    onFilterChange(filters); // Pasar el filtro memorizado
  };

  return (
    <div className="sidebar">
      <h3>Filtros</h3>
      <div>
        <label>Marca:</label>
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Filtrar por marca"
        />
      </div>
      <div>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Seleccionar estado</option>
          <option value="AVAILABLE">Disponible</option>
          <option value="OUT_OF_STOCK">Agotado</option>
        </select>
      </div>

      <button onClick={handleSubmit}>Aplicar Filtros</button>
    </div>
  );
};

export default Sidebar;
