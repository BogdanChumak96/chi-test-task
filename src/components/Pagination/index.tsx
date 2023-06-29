import React from "react";

interface Props {
  totalPages: number;
  handlePageChange: (page: number) => void;
  currentPage: number;
}

const Pagination: React.FC<Props> = ({
  totalPages,
  handlePageChange,
  currentPage,
}) => {
  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={currentPage === index + 1 ? "active" : ""}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
