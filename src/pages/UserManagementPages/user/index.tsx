import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";
import SearchBar from "../../../components/atoms/SearchBar";
import Pagination from "../../../components/atoms/Pagination";
import useFetchUserData from "../../../hooks/userManagement/useFetchUsers";
import useFetchUserDelete from "../../../hooks/userManagement/useFetchUserDelete";
import HandleDeleteData from "../../../services/utils/handleDeleteData";
import { useSelector } from "react-redux";
import { StateContext } from "../../../types/app.type";
import { userManagementStateContext } from "../../../types/app.type";
import { UserData } from "../../../types/userManagement.type";
import { Link } from "react-router";
import { useState } from "react";

export default function UserManagement() {
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [idToDetele, setIdToDelete] = useState<number>();
  useFetchUserData(String(currentPage), searchValue);
  useFetchUserDelete(idToDetele);
  const userManagementData: userManagementStateContext  = useSelector((state:StateContext) => state.userManagement);
  console.log(userManagementData.userData)
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
                  <Link to={'/user-management/create'}  className="px-8 py-3 rounded-md text-white bg-green-600 hover:bg-green-700">
                    Create
                  </Link>
                </div>
              </div>
              <table className="w-full text-sm mb-4 text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" className="px-6 py-3">
                              Name
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Email
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Action
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                    {userManagementData.userData.map((item: UserData ) => (
                      <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.name}
                        </th>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.email}
                        </th>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <Link to={`/user-management/${item.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>   
                          <span onClick={() => {HandleDeleteData(item.id, {name: item.name, kind: "User"}, setIdToDelete) }} className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Delete</span>
                        </th>
                    </tr>
                    ))}
                  </tbody>
              </table>
              <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} data={userManagementData.userDataMeta}/>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
