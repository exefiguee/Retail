import React from "react";

interface ProductTableProps {
  products: {
    id: string;
    name: string;
    normalPrice: number;
    offerPrice?: number;
    lowest?: number;
  }[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio Normal</th>
          <th>Precio de Oferta</th>
          <th>Precio Más Bajo</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.normalPrice}</td>
            <td>{product.offerPrice}</td>
            <td>{product.lowest}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
