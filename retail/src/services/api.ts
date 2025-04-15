// src/services/api.ts

const API_URL = import.meta.env.VITE_API_URL || "https://services.retailcompass.com/api/pricing/v1/products";
const API_KEY = import.meta.env.VITE_API_KEY || ""; // Usa la variable de entorno o un valor por defecto

interface Filters {
  brand: string;
  status: string;
  page: number;
  pageSize: number;
}

interface Paging {
  total: number; // Total de productos
  pages: number; // Total de páginas
  size: number; // Tamaño de la página
}

interface ProductResponse {
  paging: Paging;
  products: Array<any>; // O ajusta el tipo de acuerdo con la estructura real de tus productos
}

export const fetchProducts = async (filters: Filters): Promise<ProductResponse> => {
  const { brand, status, page, pageSize } = filters;
  const params = new URLSearchParams();

  // Añadir los parámetros de filtro si están disponibles
  if (brand) params.append('brand', brand);
  if (status) params.append('status', status);
  if (page !== undefined) params.append('page', page.toString());  // Paginación
  if (pageSize !== undefined) params.append('size', pageSize.toString());  // Tamaño de la página
  
  // Agregar el API key a los parámetros de la URL
  if (API_KEY) params.append('apikey', API_KEY);

  try {
    // Hacer la solicitud con los parámetros de la URL
    const response = await fetch(`${API_URL}?${params.toString()}`, {
      method: 'GET',
    });

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error('Error fetching products');
    }

    const data = await response.json();

    // Si la respuesta tiene productos, devolverlos junto con la información de paginación
    if (data && data.products && Array.isArray(data.products)) {
      return {
        products: data.products,
        paging: data.paging,
      };
    }

    // Si no se encuentran productos, lanzar un error
    throw new Error('No products found in the response');
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
