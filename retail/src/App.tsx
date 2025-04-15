// src/App.tsx
import { useEffect, useState } from "react";
import { fetchProducts } from "./services/api";
import Sidebar from "./components/Sidebar";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    brand: "",
    status: "",
    skus: "",
    page: 0,
    pageSize: 20,
  });
  const [paging, setPaging] = useState({
    total: 0,
    pages: 0,
    size: 0,
  });

  const handleFilterChange = (newFilters: {
    brand: string;
    status: string;
    skus?: string;
  }) => {
    setFilters({
      ...newFilters,
      skus: newFilters.skus || "",
      page: 0,
      pageSize: filters.pageSize,
    });
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts(filters);
        setProducts(data.products);
        setPaging(data.paging);
      } catch (err: any) {
        setError("Failed to fetch products: " + err.message);
      }
    };

    getProducts();
  }, [filters]);

  const goToNextPage = () => {
    if (filters.page < paging.pages - 1) {
      setFilters({ ...filters, page: filters.page + 1 });
    }
  };

  const goToPreviousPage = () => {
    if (filters.page > 0) {
      setFilters({ ...filters, page: filters.page - 1 });
    }
  };

  return (
    <div className="app">
      <div className="title">
        <h1>RetailCompass</h1>
      </div>

      <div className="main-content">
        {/* Sidebar con filtros */}
        <Sidebar onFilterChange={handleFilterChange} />

        <div className="content">
          {error && <div className="error">{error}</div>}
          {products.length > 0 ? (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Precio Normal</th>
                    <th>Precio de Oferta</th>
                    <th>Precio Más Bajo</th>
                    <th>Descuento (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index}>
                      <td>{product.name}</td>
                      <td>{product.prices?.normalPrice}</td>
                      <td>{product.prices?.offerPrice}</td>
                      <td>{product.prices?.lowest}</td>
                      <td>
                        {product.prices?.normalPrice && product.prices?.lowest
                          ? (
                              ((product.prices?.normalPrice -
                                product.prices?.lowest) /
                                product.prices?.normalPrice) *
                              100
                            ).toFixed(2)
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Paginación */}
              <div className="pagination">
                <button
                  onClick={goToPreviousPage}
                  disabled={filters.page === 0}
                >
                  Anterior
                </button>
                <span>
                  Página {filters.page + 1} de {paging.pages}
                </span>
                <button
                  onClick={goToNextPage}
                  disabled={filters.page === paging.pages - 1}
                >
                  Siguiente
                </button>
              </div>
            </>
          ) : (
            <div>No products found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
