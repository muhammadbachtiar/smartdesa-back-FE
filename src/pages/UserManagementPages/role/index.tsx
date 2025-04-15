import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";
import SearchBar from "../../../components/atoms/SearchBar";
import Pagination from "../../../components/atoms/Pagination";
import useFetchRoleData from "../../../hooks/userManagement/useFetchRoles";
import useFetchRoleDelete from "../../../hooks/userManagement/useFetchRoleDelete";
import HandleDeleteData from "../../../services/utils/handleDeleteData";
import { useSelector } from "react-redux";
import { StateContext } from "../../../types/app.type";
import { userManagementStateContext } from "../../../types/app.type";
import { RoleData } from "../../../types/userManagement.type";
import { Link } from "react-router";
import { useEffect, useState } from "react";

export default function RoleManagement() {
  const userManagementData: userManagementStateContext  = useSelector((state:StateContext) => state.userManagement);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(userManagementData.roleDataMeta.current_page || 1);
  const [idToDetele, setIdToDelete] = useState<number>();
  const ReloadData = () => {
    useFetchRoleData(String(currentPage), searchValue); 
  };
  
  useFetchRoleDelete(idToDetele,  ReloadData);
  useFetchRoleData(String(currentPage), searchValue);

  useEffect(()=>{
    setCurrentPage(1)
  },[searchValue])

  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Users" />
      <div className="space-y-6">
        <ComponentCard title="Users">
          <div className="relative overflow-x-auto sm:rounded-lg">
              <div className="flex flex-col md:flex-row justify-between py-4">
                <div className="pb-4 content-center bg-white dark:bg-gray-900">
                    <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
                </div>
                <div className="content-center bg-white dark:bg-gray-900">
                  <Link to={'/role-management/create'}  className="px-8 py-3 rounded-md text-white bg-green-600 hover:bg-green-700">
                    Create
                  </Link>
                </div>
              </div>
              <table className="w-full text-sm mb-4 text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" className="px-6 py-3">
                              Role name
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Action
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                    {(searchValue ? userManagementData.roleData.searchResults[searchValue]?.[currentPage] : userManagementData.roleData.pages[currentPage])?.map((item: RoleData ) => (
                      <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.nama}
                        </th>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <Link to={`/role-management/${item.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>   
                          <span onClick={() => {HandleDeleteData(item.id, {name: item.nama, kind: "Role"}, setIdToDelete) }} className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Delete</span>
                        </th>
                    </tr>
                    ))}
                  </tbody>
              </table>
              <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} data={userManagementData.roleDataMeta}/>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
