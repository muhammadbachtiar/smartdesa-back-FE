import React, { useState, useEffect } from "react";
import { MetaType } from "../../types/app.type";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (value: number) => void;
  pageLimit: number;
  setPageLimit: (value: number) => void;
  data: MetaType;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  setPageLimit,
  data,
}) => {
  const [pages, setPages] = useState<number[]>([]);

  const handlePageChange = (pages: number) => {
    setCurrentPage(pages);
  };

  const handlePageLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value, 10);
    setPageLimit(value);
    setCurrentPage(1);
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
      if (data && data.last_page) {
        const { current_page, last_page } = data;
        const maxPagesToShow = 10;
        let startPage = Math.max(
          1,
          current_page - Math.floor(maxPagesToShow / 2)
        );
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
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex items-center gap-3">
          <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px text-sm">
              <li>
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-black bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Previous
                </button>
              </li>
              {pages.map((page) => (
                <li key={page}>
                  <button
                    onClick={() => handlePageChange(page)}
                    aria-current={currentPage === page ? "page" : undefined}
                    className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                      currentPage === page
                        ? "text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                        : ""
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
                    currentPage === data.last_page
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>

          {/* record info */}
          <div className="border-t border-gray-100 py-4 pl-[18px] pr-4 dark:border-gray-800">
            <p className="border-b border-gray-100 pb-3 text-center text-sm font-medium text-gray-500 dark:border-gray-800 dark:text-gray-400 xl:border-b-0 xl:pb-0 xl:text-left">
              Showing <span x-text="startEntry">{data.current_page}</span> to
              <span x-text="endEntry"> {data.per_page} </span> of
              <span x-text="totalEntries"> {data.total} </span> entries
            </p>
          </div>
          {/* end */}
        </div>

        {/* limit per page */}
        <div className="flex items-center gap-2 text-sm sm:top">
          <span className="text-gray-500 dark:text-gray-400"> Show </span>
          <div
            x-data="{ isOptionSelected: false }"
            className="relative z-20 bg-transparent"
          >
            <select
              className="dark:bg-dark-900 h-9 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none py-2 pl-3 pr-8 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              // value={pageLimit}
              onChange={handlePageLimit}
            >
              <option
                value="10"
                className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
              >
                20
              </option>
              <option
                value="8"
                className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
              >
                10
              </option>
              <option
                value="5"
                className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
              >
                5
              </option>
            </select>
            <span className="absolute right-2 top-1/2 z-30 -translate-y-1/2 text-gray-500 dark:text-gray-400">
              <svg
                className="stroke-current"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.8335 5.9165L8.00016 10.0832L12.1668 5.9165"
                  stroke=""
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </span>
          </div>
          <span className="text-gray-500 dark:text-gray-400"> entries </span>
        </div>
        {/* end */}
      </div>
    </>
  );
};

export default Pagination;
