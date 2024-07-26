'use client'
import React from 'react'

const PaginationButtons = ({ currentPage, itemsPerPage, totalItems, paginate }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="mt-5 flex justify-center items-center">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 mr-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-sm text-gray-700 dark:text-gray-300 rounded"
      >
        Previous
      </button>
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-sm text-gray-700 dark:text-gray-300 rounded"
      >
        Next
      </button>
    </div>
  )
}

export default PaginationButtons
