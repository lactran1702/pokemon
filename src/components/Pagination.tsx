"use client";

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  isLoading,
  onPreviousPage,
  onNextPage,
}: PaginationProps) => {
  return (
    <div className="flex justify-center gap-4 mt-8">
      <button
        onClick={onPreviousPage}
        disabled={currentPage === 1 || isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded-full disabled:bg-gray-300 hover:bg-blue-600 disabled:cursor-not-allowed cursor-pointer transition-colors"
      >
        Previous
      </button>
      <span className="px-4 py-2">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={onNextPage}
        disabled={currentPage >= totalPages || isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded-full disabled:bg-gray-300 hover:bg-blue-600 disabled:cursor-not-allowed cursor-pointer transition-colors"
      >
        Next
      </button>
    </div>
  );
};
