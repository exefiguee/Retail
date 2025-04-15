// src/components/ProductTable.tsx
import React from "react";

interface Product {
  id: number;
  name: string;
  lowestPrice: number;
  normalPrice: number;
  offerPrice: number;
}

interface ProductTableProps {
  products: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  const calculateDiscount = (normal: number, lowest: number) => {
    return ((normal - lowest) / normal) * 100;
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Producto</th>
          <th>Precio Normal</th>
          <th>Precio Oferta</th>
          <th>Precio Más Bajo</th>
          <th>Descuento (%)</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.normalPrice}</td>
            <td>{product.offerPrice}</td>
            <td>{product.lowestPrice}</td>
            <td>
              {calculateDiscount(
                product.normalPrice,
                product.lowestPrice
              ).toFixed(2)}
              %
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
