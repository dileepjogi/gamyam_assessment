import React from "react";

export default function Pagination({ totalPages, currentPage, onPageChange }) {
  return (
    // <div className="flex justify-center gap-2 mb-6">
    //   {Array.from({ length: totalPages }, (_, i) => (
    //     <button
    //       key={i}
    //       onClick={() => onPageChange(i + 1)}
    //       className={`px-3 py-1 rounded ${
    //         currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
    //       }`}
    //     >
    //       {i + 1}
    //     </button>
    //   ))}
    // </div>
    <div className="flex justify-center gap-2 mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>
      <span className="px-3 py-1">
        {currentPage} / {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
