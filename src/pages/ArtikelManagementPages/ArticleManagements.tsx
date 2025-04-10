import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import SearchBar from "../../components/atoms/SearchBar";
import Pagination from "../../components/atoms/Pagination";
import HandleDeleteData from "../../services/utils/handleDeleteData";
import { useSelector } from "react-redux";
import { articleManagementStateContext, StateContext } from "../../types/app.type";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { ArticleData } from "../../types/articleManagement.type";
import useFetchArticleData from "../../hooks/articleManagement/useFetchArticle";
import useFetchArticleDelete from "../../hooks/articleManagement/useFetchArticleDelete";

export default function ArticleManagement() {
  const articleManagementData: articleManagementStateContext  = useSelector((state:StateContext) => state.articleManagement);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(articleManagementData.articleDataMeta.current_page || 1);
  const [idToDetele, setIdToDelete] = useState<number>();
  
  const ArticleadData = () => {
    useFetchArticleData(String(currentPage), searchValue); 
  };
  
  useFetchArticleDelete(idToDetele,  ArticleadData);
  useFetchArticleData(String(currentPage), searchValue);

  useEffect(()=>{
    setCurrentPage(1)
  },[searchValue])

  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Article" />
      <div className="space-y-6">
        <ComponentCard title="Article">
          <div className="relative overflow-x-auto sm:rounded-lg">
              <div className="flex flex-col md:flex-row justify-between py-4">
                <div className="pb-4 content-center bg-white dark:bg-gray-900">
                    <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
                </div>
                <div className="content-center bg-white dark:bg-gray-900">
                  <Link to={'/article-management/create'}  className="px-8 py-3 rounded-md text-white bg-green-600 hover:bg-green-700">
                    Create
                  </Link>
                </div>
              </div>
              <table className="w-full text-sm mb-4 text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" className="px-6 py-3">
                              Title
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Thumbnail
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Publish Date
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Action
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                    {(searchValue ? articleManagementData.articleData.searchResults[searchValue]?.[currentPage] : articleManagementData.articleData.pages[currentPage])?.map((item: ArticleData ) => (
                      <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.title}
                        </th>
                        <th scope="row">
                          <img src={item.thumbnail || ""} className="w-16 md:w-32 max-w-full max-h-full" alt={item.title}/>
                        </th>
                        <th scope="row">
                            <p className="px-6 py-4 font-light text-gray-900 dark:text-white">{item.published_at}</p>
                        </th>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <Link to={`/article-management/${item.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>   
                          <span onClick={() => {HandleDeleteData(item.id, {name: item.title, kind: "Article"}, setIdToDelete) }} className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Delete</span>
                        </th>
                    </tr>
                    ))}
                  </tbody>
              </table>
              <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} data={articleManagementData.articleDataMeta}/>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
