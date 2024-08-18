import React from 'react';

const AdminPagination = ({ currentPage, pageCount, onPageChange }) => {
  return (
    <div className="mt-4 flex items-center justify-center">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-200 text-gray-700 border rounded-l-lg mr-2 disabled:opacity-50"
      >
        Previous
      </button>
      <span className="px-4 py-2 bg-gray-200 text-gray-700 border">
        Page {currentPage} of {pageCount}
      </span>
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, pageCount))}
        disabled={currentPage === pageCount}
        className="px-7 py-2 bg-gray-200 text-gray-700 border rounded-r-lg ml-2 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default AdminPagination;