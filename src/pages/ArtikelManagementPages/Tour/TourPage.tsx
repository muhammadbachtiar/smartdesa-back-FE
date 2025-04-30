import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";
import SearchBar from "../../../components/atoms/SearchBar";
import Pagination from "../../../components/atoms/Pagination";
import { useEffect, useState } from "react";
import useTourQuery from "../../../hooks/tour/useTourQuery";
import { Link } from "react-router";
import { TourData } from "../../../types/tourManagement.type";
import HandleShowToast from "../../../services/utils/handleShowToast";
import useDeleteBulkTour from "../../../hooks/tour/useDeleteBulkTour";

export default function TourPage() {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSelectedRow, setIsSelectedRow] = useState(false);
  const [pageLimit, setPageLimit] = useState(10);

  const { data, isLoading, isError, refetch } = useTourQuery(
    currentPage,
    pageLimit,
    searchValue
  );
  const { handleDeleteBulkTour } = useDeleteBulkTour(refetch);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    setPageLimit(pageLimit);
    setCurrentPage(1);
  }, [searchValue, selectedIds, pageLimit]);

  if (isLoading) {
    HandleShowToast("info", "Please wait, Fetching data...");
    return null;
  }

  if (isError) {
    HandleShowToast("warning", "Failed to load category data");
    return null;
  }

  const toursData = data?.data.data || [];
  const meta = {
    current_page: data?.data.meta.current_page || 1,
    total: data?.data.meta.total || 0,
    per_page: data?.data.meta.per_page || 10,
    last_page: data?.data.meta.last_page || 1,
    next_page_url: data?.data.meta.next_page_url || null,
    prev_page_url: data?.data.meta.prev_page_url || null,
  };

  const handleSelectRow = (id: number) => {
    let updatedIds: number[];

    setIsSelectedRow(true);

    if (selectedIds.includes(id)) {
      updatedIds = selectedIds.filter((itemId) => itemId !== id);
    } else {
      updatedIds = [...selectedIds, id];
    }

    setSelectedIds(updatedIds);
  };

  const handleSelectAll = () => {
    const allIds = toursData.map((item) => item.id);

    setIsSelectedRow(false);

    if (selectedIds.length === toursData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(allIds);
    }
  };

  return (
    <>
      <PageMeta title="Tour Page" description="Manage tour here" />
      <PageBreadcrumb pageTitle="Tour" />
      <div className="space-y-6">
        <ComponentCard title="Tours List">
          <div className="relative overflow-x-auto sm:rounded-lg">
            <div className="flex flex-col md:flex-row justify-between py-4">
              <div className="flex item-center gap-3 mt-1">
                <SearchBar
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
              </div>

              <div className="flex item-center gap-3 mt-1">
                {selectedIds.length > 0 ? (
                  <button
                    onClick={() => handleDeleteBulkTour(selectedIds)}
                    className="px-8 py-3 rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    Delete Selected
                  </button>
                ) : (
                  <Link
                    to="/tour/create"
                    className="px-8 py-3 rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    Create
                  </Link>
                )}
              </div>
            </div>

            <table className="w-full text-sm mb-4 text-left text-gray-500 dark:text-gray-400">
              <thead className="border-b border-gray-100 dark:border-white/[0.05]">
                <tr>
                  <th className="w-[1%] py-3 px-6">
                    <div className="flex items-center justify-center">
                      <input
                        className="w-5 h-5 appearance-none cursor-pointer dark:border-gray-700 border border-gray-300 checked:border-transparent rounded-md checked:bg-brand-500 disabled:opacity-60"
                        type="checkbox"
                        checked={
                          selectedIds.length > 0 &&
                          selectedIds.length === selectedIds.length &&
                          !isSelectedRow
                        }
                        onChange={handleSelectAll}
                      />
                      {selectedIds.length > 0 && !isSelectedRow && (
                        <svg
                          className="absolute w-3 h-3 text-white pointer-events-none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-6">Title</th>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3">Address</th>
                  <th className="px-6 py-3">GMap</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {toursData.map((item: TourData) => (
                  <tr
                    key={item.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    {/* <td className="px-6 py-4">
                      <input
                        className="w-5 h-5 appearance-none cursor-pointer dark:border-gray-700 border border-gray-300 checked:border-transparent rounded-md checked:bg-brand-500 disabled:opacity-60"
                        type="checkbox"
                        checked={selectedIds.includes(item.id)}
                        onChange={() => handleSelectRow(item.id)}
                      />
                    </td> */}
                    <div className="relative flex items-center justify-center py-6">
                      <input
                        className="w-5 h-5 appearance-none cursor-pointer dark:border-gray-700 border border-gray-300 checked:border-transparent rounded-md checked:bg-brand-500 disabled:opacity-60"
                        type="checkbox"
                        checked={selectedIds.includes(item.id)}
                        onChange={() => handleSelectRow(item.id)}
                      />
                      {selectedIds.includes(item.id) && (
                        <svg
                          className="absolute w-3 h-3 text-white pointer-events-none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 font-light text-gray-900 dark:text-white">
                      {item.description.slice(0, 200)}
                      {item.description.length > 200 ? "..." : ""}
                    </td>
                    <td className="px-6 py-4 font-light text-gray-900 dark:text-white">
                      {item.address.slice(0, 200)}
                      {item.address.length > 200 ? "..." : ""}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {item.link.gmap}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      <Link
                        to={`/tour/edit/${item.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pageLimit={pageLimit}
              setPageLimit={setPageLimit}
              data={meta}
            />
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
