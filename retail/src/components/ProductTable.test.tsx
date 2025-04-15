// src/components/ProductTable.test.tsx
import { render, screen } from "@testing-library/react";
import ProductTable from "./ProductTable";
import "@testing-library/jest-dom";

test("muestra la tabla de productos", () => {
  const products = [
    {
      id: 1,
      name: "Producto 1",
      lowestPrice: 100,
      normalPrice: 150,
      offerPrice: 120,
    },
    {
      id: 2,
      name: "Producto 2",
      lowestPrice: 80,
      normalPrice: 120,
      offerPrice: 100,
    },
  ];

  render(<ProductTable products={products} />);

  expect(screen.getByText("Producto 1")).toBeInTheDocument();
  expect(screen.getByText("Producto 2")).toBeInTheDocument();
});
