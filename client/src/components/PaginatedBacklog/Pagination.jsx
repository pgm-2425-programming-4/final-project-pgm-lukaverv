function Pagination({ totalPages, currentPage, onPageChanged }) {
  const pageLinks = [];

  for (let i = 0; i < totalPages; i++) {
    const pageNumber = i + 1;
    pageLinks.push(
      <li key={pageNumber}>
        <button
          className={
            "pagination-link " +
            (pageNumber === currentPage ? "is-current" : "")
          }
          aria-label={"Go to Page " + pageNumber}
          aria-current={pageNumber === currentPage}
          onClick={() => onPageChanged(pageNumber)}
          style={{ cursor: "pointer" }}
        >
          {pageNumber}
        </button>
      </li>
    );
  }

  return (
    <nav className="pagination" role="navigation" aria-label="pagination">
      <button
        className="pagination-previous"
        disabled={currentPage === 1}
        onClick={() => onPageChanged(currentPage - 1)}
      >
        Previous
      </button>
      <button
        className="pagination-next"
        disabled={currentPage === totalPages}
        onClick={() => onPageChanged(currentPage + 1)}
      >
        Next page
      </button>
      <ul className="pagination-list">{pageLinks}</ul>
    </nav>
  );
}

export default Pagination;
