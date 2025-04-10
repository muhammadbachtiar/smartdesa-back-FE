import React, { useState, useEffect } from 'react';
import { MetaType } from '../../types/app.type';

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (value: number) => void;
  data : MetaType,
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, setCurrentPage, data }) => {
  
  const [pages, setPages] = useState<number[]>([]);

  
  const handlePageChange = (pages : number) => {
    setCurrentPage(pages);
  };

  const handleNextPage = () => {
    if (currentPage < data.last_page) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  useEffect(() => {
    if (data) {
      if (data && data.last_page){
        const { current_page, last_page } = data;
        const maxPagesToShow = 10;
        let startPage = Math.max(1, current_page - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(last_page, startPage + maxPagesToShow - 1);
    
        if (endPage - startPage + 1 < maxPagesToShow) {
          startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }
    
        const pageNumbers = [];
        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(i);
        }
    
        setPages(pageNumbers);
        setCurrentPage(current_page);
      }
    }
  }, [data, setCurrentPage]);


  return (
    <>
        <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px text-sm">
                  <li>
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-black bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                        currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      Previous
                    </button>
                  </li>
                  {pages.map((page) => (
                    <li key={page}>
                      <button
                        onClick={() => handlePageChange(page)}
                        aria-current={currentPage === page ? 'page' : undefined}
                        className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                          currentPage === page ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : ''
                        }`}
                      >
                        {page}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === data.last_page}
                      className={`flex items-center justify-center px-3 h-8 leading-tight text-black bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                        currentPage === data.last_page ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
    </>
  );
};

export default Pagination;