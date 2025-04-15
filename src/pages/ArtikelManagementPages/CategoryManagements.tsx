import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import SearchBar from "../../components/atoms/SearchBar";
import Pagination from "../../components/atoms/Pagination";
import HandleDeleteData from "../../services/utils/handleDeleteData";
import { useSelector } from "react-redux";
import { categoryManagementStateContext, StateContext } from "../../types/app.type";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import useFetchCategoryDelete from "../../hooks/articleManagement/useFetchCategoryDelete";
import useFetchCategoryData from "../../hooks/articleManagement/useFetchCategory";
import { CategoryData } from "../../types/categoryManagement.type";

export default function CategoryManagement() {
  const categoryManagementData: categoryManagementStateContext  = useSelector((state:StateContext) => state.categoryManagement);
  console.log(categoryManagementData)
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(categoryManagementData.categoryDataMeta.current_page || 1);
  const [idToDetele, setIdToDelete] = useState<number>();
  
  const CategoryadData = () => {
    useFetchCategoryData(String(currentPage), searchValue); 
  };
  
  useFetchCategoryData(String(currentPage), searchValue);
  useFetchCategoryDelete(idToDetele,  CategoryadData);

  useEffect(()=>{
    setCurrentPage(1)
  },[searchValue])

  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Category" />
      <div className="space-y-6">
        <ComponentCard title="Category">
          <div className="relative overflow-x-auto sm:rounded-lg">
              <div className="flex flex-col md:flex-row justify-between py-4">
                <div className="pb-4 content-center bg-white dark:bg-gray-900">
                    <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
                </div>
                <div className="content-center bg-white dark:bg-gray-900">
                  <Link to={'/category-management/create'}  className="px-8 py-3 rounded-md text-white bg-green-600 hover:bg-green-700">
                    Create
                  </Link>
                </div>
              </div>
              <table className="w-full text-sm mb-4 text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" className="px-6 py-3">
                              Category name
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Description
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Action
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                    {(searchValue ? categoryManagementData.categoryData.searchResults[searchValue]?.[currentPage] : categoryManagementData.categoryData.pages[currentPage])?.map((item: CategoryData ) => (
                      <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.name}
                        </th>
                        <th scope="row">
                            <p className="px-6 py-4 font-light text-gray-900 dark:text-white">{item.description.slice(0, 200)}{item.description.length > 200 ? "..." : ""}</p>
                        </th>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <Link to={`/category-management/${item.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>   
                          <span onClick={() => {HandleDeleteData(item.id, {name: item.name, kind: "Category"}, setIdToDelete) }} className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Delete</span>
                        </th>
                    </tr>
                    ))}
                  </tbody>
              </table>
              <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} data={categoryManagementData.categoryDataMeta}/>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
