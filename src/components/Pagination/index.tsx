import { isActiveButton } from "@utils/constants";
import { IPagination } from "../../types";
import "./styles.css";

const Pagination: React.FC<IPagination> = ({
  totalPages,
  handlePageChange,
  currentPage,
}) => {
  const visiblePages = 6;

  const handlePreviousClick = () => {
    handlePageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    handlePageChange(currentPage + 1);
  };

  const handleFirstClick = () => {
    handlePageChange(1);
  };

  const handleLastClick = () => {
    handlePageChange(totalPages);
  };

  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;
  const previousButtonClassName = isPreviousDisabled
    ? isActiveButton.DISABLE
    : "";
  const nextButtonClassName = isNextDisabled ? isActiveButton.DISABLE : "";

  const renderPageButtons = () => {
    const pageButtons = [];
    const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(startPage + visiblePages - 1, totalPages);

    const renderButton = (pageNum: number) => {
      const isActive = currentPage === pageNum;
      const buttonClassName = isActive ? isActiveButton.ACTIVE : "";

      return (
        <button
          key={pageNum}
          onClick={() => handlePageChange(pageNum)}
          className={buttonClassName}
        >
          {pageNum}
        </button>
      );
    };

    if (startPage > 1) {
      pageButtons.push(
        <button
          key="first"
          onClick={handleFirstClick}
          disabled={isPreviousDisabled}
        >
          First
        </button>
      );
    }

    if (!isPreviousDisabled) {
      pageButtons.push(
        <button
          key="previous"
          onClick={handlePreviousClick}
          disabled={isPreviousDisabled}
          className={previousButtonClassName}
        >
          Previous
        </button>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(renderButton(i));
    }

    if (!isNextDisabled) {
      pageButtons.push(
        <button
          key="next"
          onClick={handleNextClick}
          disabled={isNextDisabled}
          className={nextButtonClassName}
        >
          Next
        </button>
      );
    }

    if (endPage < totalPages) {
      pageButtons.push(
        <button
          key="last"
          onClick={handleLastClick}
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      );
    }

    return pageButtons;
  };

  const renderedButtons = renderPageButtons();

  return <div className="pagination">{renderedButtons}</div>;
};

export default Pagination;
