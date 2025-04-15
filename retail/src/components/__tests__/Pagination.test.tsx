import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../Pagination";
import "@testing-library/jest-dom";

describe("Pagination", () => {
  it("debe mostrar la página actual y el total de páginas", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPrevious={() => {}}
        onNext={() => {}}
      />
    );

    expect(screen.getByText("Página 2 de 5")).toBeInTheDocument();
  });

  it("debe deshabilitar el botón de 'Anterior' si estamos en la primera página", () => {
    render(
      <Pagination
        currentPage={0}
        totalPages={5}
        onPrevious={() => {}}
        onNext={() => {}}
      />
    );

    expect(screen.getByText("Anterior")).toBeDisabled();
  });

  it("debe deshabilitar el botón de 'Siguiente' si estamos en la última página", () => {
    render(
      <Pagination
        currentPage={4}
        totalPages={5}
        onPrevious={() => {}}
        onNext={() => {}}
      />
    );

    expect(screen.getByText("Siguiente")).toBeDisabled();
  });

  it("debe llamar a la función 'onPrevious' al hacer clic en el botón 'Anterior'", () => {
    const onPreviousMock = jest.fn();

    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPrevious={onPreviousMock}
        onNext={() => {}}
      />
    );

    fireEvent.click(screen.getByText("Anterior"));
    expect(onPreviousMock).toHaveBeenCalledTimes(1);
  });

  it("debe llamar a la función 'onNext' al hacer clic en el botón 'Siguiente'", () => {
    const onNextMock = jest.fn();

    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPrevious={() => {}}
        onNext={onNextMock}
      />
    );

    fireEvent.click(screen.getByText("Siguiente"));
    expect(onNextMock).toHaveBeenCalledTimes(1);
  });
});
