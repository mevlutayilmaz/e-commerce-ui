import React from 'react';

const Pagination = ({ currentPage, pageCount, onPageChange }) => {
  if (pageCount <= 1) return null;

  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(pageCount, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  let pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={`mx-1 px-3 py-1 rounded ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        {i}
      </button>
    );
  }

  return <div className="flex justify-center mt-4">{pages}</div>;
};

export default Pagination;
