import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: PaginationProps) => {
  return (
    <div className="pagination">
      <button onClick={onPrevious} disabled={currentPage === 0}>
        Anterior
      </button>
      <span>
        Página {currentPage + 1} de {totalPages}
      </span>
      <button onClick={onNext} disabled={currentPage === totalPages - 1}>
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
