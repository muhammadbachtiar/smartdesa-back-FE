import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";
import SearchBar from "../../../components/atoms/SearchBar";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { infografisManagementStateContext, StateContext } from "../../../types/app.type";
import useFetchInfografisData from "../../../hooks/articleManagement/infografis/useFetchInfografis";
import HandleDeleteData from "../../../services/utils/handleDeleteData";
import { InfografisData } from "../../../types/infografisManagement.type";
import Pagination from "../../../components/atoms/Pagination";
import useFetchInfografisDelete from "../../../hooks/articleManagement/infografis/useFetchInfografisDelete";

export default function InfografisIndex() {
  const infografisManagementData: infografisManagementStateContext = useSelector(
    (state: StateContext) => state.infografisManagement
  );

  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(
    infografisManagementData.infografisDataMeta.current_page || 1
  );
  const [idToDelete, setIdToDelete] = useState<number>();

  const InfografisadData = () => {
    useFetchInfografisData(String(currentPage), searchValue); 
  };
  
  useFetchInfografisDelete(idToDelete,  InfografisadData);
  useFetchInfografisData(String(currentPage), searchValue);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue]);

  const currentData = searchValue
    ? infografisManagementData.infografisData.searchResults[searchValue]?.[currentPage]
    : infografisManagementData.infografisData.pages[currentPage];

  return (
    <>
      <PageMeta
        title="Infografis Management"
        description="Kelola data infografis secara efisien"
      />
      <PageBreadcrumb pageTitle="Infografis" />
      <div className="space-y-6">
        <ComponentCard title="Infografis">
          <div className="relative overflow-x-auto sm:rounded-lg">
            <div className="flex flex-col md:flex-row justify-between py-4">
              <div className="pb-4 content-center bg-white dark:bg-gray-900">
                <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
              </div>
              <div className="content-center bg-white dark:bg-gray-900">
                <Link
                  to={'/infografis-management/create'}
                  className="px-8 py-3 rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  Create
                </Link>
              </div>
            </div>
            <table className="w-full text-sm mb-4 text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Description</th>                  
                  <th className="px-6 py-3">Publish Date</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentData?.map((item: InfografisData) => (
                  <tr
                    key={item.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 font-light text-gray-900 dark:text-white line-clamp-2">
                      {item.description}
                    </td>
                    <td>
                      <p className="px-6 py-4 font-light text-gray-900 dark:text-white">
                        {item.published_at}
                      </p>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <Link
                        to={`/infografis-management/${item.id}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </Link>
                      <span
                        onClick={() =>
                          HandleDeleteData(item.id, { name: item.title, kind: "Infografis" }, setIdToDelete)
                        }
                        className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3 cursor-pointer"
                      >
                        Delete
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              data={infografisManagementData.infografisDataMeta}
            />
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
