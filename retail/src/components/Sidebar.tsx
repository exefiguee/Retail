// src/components/Sidebar.tsx
import React, { useState } from "react";

const Sidebar = ({
  onFilterChange,
}: {
  onFilterChange: (filters: any) => void;
}) => {
  const [brand, setBrand] = useState("");
  const [status, setStatus] = useState("");
  const [skus, setSkus] = useState("");

  const handleSubmit = () => {
    const filters = {
      brand,
      status: status.split(",").map((s) => s.trim()), // Convertir a array de status
      skus: skus.split(",").map((sku) => sku.trim()), // Convertir a array de SKUs
    };
    onFilterChange(filters); // Enviar los filtros actualizados
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
