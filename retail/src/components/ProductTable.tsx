import React from "react";

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

interface Props {
  products: Product[];
}

const ProductTable = ({ products }: Props) => {
  return (
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
            <td>{product.prices?.offerPrice ?? "N/A"}</td>
            <td>{product.prices?.lowest ?? "N/A"}</td>
            <td>
              {product.prices?.normalPrice && product.prices?.lowest
                ? (
                    ((product.prices.normalPrice - product.prices.lowest) /
                      product.prices.normalPrice) *
                    100
                  ).toFixed(2)
                : "N/A"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
