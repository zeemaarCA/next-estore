"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ count }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const currentPage = Number(searchParams.get("page")) || 1;
  const ITEM_PER_PAGE = 12;
  const totalPages = Math.ceil(count / ITEM_PER_PAGE);

  const handleChangePage = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    replace(`${pathname}?${params}`);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Increased for better visibility

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust the window if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Add first page and ellipsis if necessary
    if (startPage > 1) {
      pageNumbers.push(
        <button key={1} className="join-item btn btn-sm" onClick={() => handleChangePage(1)}>
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(
          <button key="ellipsis1" className="join-item btn btn-sm btn-disabled">...</button>
        );
      }
    }

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`join-item btn btn-sm ${currentPage === i ? 'btn-active' : ''}`}
          onClick={() => handleChangePage(i)}
        >
          {i}
        </button>
      );
    }

    // Add last page and ellipsis if necessary
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <button key="ellipsis2" className="join-item btn btn-sm btn-disabled">...</button>
        );
      }
      pageNumbers.push(
        <button
          key={totalPages}
          className="join-item btn btn-sm"
          onClick={() => handleChangePage(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="join flex justify-center items-center mt-8">
      <button
        className="join-item btn btn-sm"
        disabled={currentPage === 1}
        onClick={() => handleChangePage(currentPage - 1)}
      >
        «
      </button>
      {renderPageNumbers()}
      <button
        className="join-item btn btn-sm"
        disabled={currentPage === totalPages}
        onClick={() => handleChangePage(currentPage + 1)}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;