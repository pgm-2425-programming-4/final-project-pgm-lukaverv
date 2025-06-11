function Pagination({ totalPages, currentPage, onPageChanged }) {
  const pageLinks = [];

  for (let i = 0; i < totalPages; i++) {
    const pageNumber = i + 1;
    pageLinks.push(
      <li className="pagination__item" key={pageNumber}>
        <button
          className={
            "pagination__link" +
            (pageNumber === currentPage ? " pagination__link--current" : "")
          }
          aria-label={`Go to Page ${pageNumber}`}
          aria-current={pageNumber === currentPage}
          onClick={() => onPageChanged(pageNumber)}
          style={{ cursor: "pointer" }}
        >
          {pageNumber}
        </button>
      </li>,
    );
  }

  return (
    <>
      <div className="pagination__page">
        <nav className="pagination" role="navigation" aria-label="pagination">
          <button
            className="pagination__previous button"
            disabled={currentPage === 1}
            onClick={() => onPageChanged(currentPage - 1)}
          >
            Previous
          </button>
          <button
            className="pagination__next button"
            disabled={currentPage === totalPages}
            onClick={() => onPageChanged(currentPage + 1)}
          >
            Next page
          </button>
        </nav>
        <ul className="pagination__list">{pageLinks}</ul>
      </div>
    </>
  );
}

export default Pagination;
