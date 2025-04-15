import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import SearchBar from "../../components/atoms/SearchBar";
import Pagination from "../../components/atoms/Pagination";
import { useEffect, useState } from "react";
import useCategoryQuery from "../../hooks/tour/useTourQuery";
import { Link } from "react-router";
import { TourData } from "../../types/tourManagement.type";
import useDeleteTour from "../../hooks/tour/useDeleteTour";

export default function TourPageIndex() {
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { handleDelete } = useDeleteTour();

  const { data, isLoading, isError } = useCategoryQuery(currentPage, searchValue);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue]);

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load category data</p>;

  const toursData = data?.data || [];
  const meta = {
    current_page: data?.current_page || 1,
    total: data?.total || 0,
    per_page: data?.per_page || 10,
    last_page: data?.last_page || 1,
    next_page_url: data?.next_page_url || null,
    prev_page_url: data?.prev_page_url || null
  };

  return (
    <>
      <PageMeta title="Tour Page" description="Manage tour here" />
      <PageBreadcrumb pageTitle="Tour" />
      <div className="space-y-6">
        <ComponentCard title="Tour">
          <div className="relative overflow-x-auto sm:rounded-lg">
            <div className="flex flex-col md:flex-row justify-between py-4">
              <div className="pb-4 content-center bg-white dark:bg-gray-900">
                <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
              </div>
              <div className="content-center bg-white dark:bg-gray-900">
                <Link to={'/tour/create'} className="px-8 py-3 rounded-md text-white bg-green-600 hover:bg-green-700">
                  Create
                </Link>
              </div>
            </div>

            <table className="w-full text-sm mb-4 text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3">Address</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {toursData.map((item: TourData) => (
                  <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.title}</td>
                    <td className="px-6 py-4 font-light text-gray-900 dark:text-white">
                      {item.description.slice(0, 200)}{item.description.length > 200 ? "..." : ""}
                    </td>
                    <td className="px-6 py-4 font-light text-gray-900 dark:text-white">
                      {item.address.slice(0, 200)}{item.address.length > 200 ? "..." : ""}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      <Link to={`/category-management/${item.id}`} className="text-blue-600 hover:underline">Edit</Link>
                      <button onClick={() => handleDelete(item.id, item.title)} className="text-red-600 hover:underline ms-3">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} data={meta} />
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
