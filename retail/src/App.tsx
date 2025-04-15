import { useEffect, useState } from "react";
import { fetchProducts } from "./services/api";
import Sidebar from "./components/Sidebar";
import ProductTable from "./components/ProductTable";
import Pagination from "./components/Pagination";
import "./App.css";

interface Product {
  id: string;
  name: string;
  brand: string;
  status: "AVAILABLE" | "OUT_OF_STOCK";
  prices: {
    normalPrice: number;
    offerPrice?: number;
    lowest?: number;
  };
}

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    brand: "",
    status: "",
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
  }) => {
    setFilters({
      ...newFilters,
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
        <Sidebar onFilterChange={handleFilterChange} />

        <div className="content">
          {error && <div className="error">{error}</div>}

          {products.length > 0 ? (
            <>
              <ProductTable products={products} />

              <Pagination
                currentPage={filters.page}
                totalPages={paging.pages}
                onPrevious={goToPreviousPage}
                onNext={goToNextPage}
              />
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
