import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import Pagination from "../../components/atoms/Pagination";
import useFetchPermissionData from "../../hooks/userManagement/useFetchPermissions";
import useFetchRolebyId from "../../hooks/userManagement/useFetchRolebyId";
import useFetchRoleUpdate from "../../hooks/userManagement/useFetchRoleUpdate";
import { useSelector } from "react-redux";
import { StateContext } from "../../types/app.type";
import { RoleData } from "../../types/userManagement.type";
import { RoleForm } from "../../types/form.type";
import { userManagementStateContext } from "../../types/app.type";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

export default function EditRole() {
  const { id } = useParams();
  const roleData: RoleData | null = useFetchRolebyId(id);
  const userManagementData: userManagementStateContext  = useSelector((state:StateContext) => state.userManagement);
  const { register, reset, setValue, handleSubmit, watch } = useForm<RoleForm>({
    defaultValues:{
      permissions: [],
      nama: ""
    },
  });
  const [currentPage, setCurrentPage] = useState( userManagementData.permissionsDataMeta.current_page || 1);
  const [formData, setFormData] = useState<RoleForm | null>(null);
  useFetchPermissionData(currentPage);
  useFetchRoleUpdate(formData, id);
  
  const currentPermissions = watch("permissions");
  
  const onSubmit = (data: RoleForm) => {
    setFormData(data);
    reset(); 
  };
  
  const handleCheckboxChange = (id: number) => {
    const updatedPermissions = currentPermissions.includes(id)
    ? currentPermissions.filter((permId) => permId !== id) 
    : [...currentPermissions, id]; 
    
    setValue("permissions", updatedPermissions); 
  };

  useEffect(() => {
    if (roleData) {
      setValue('permissions', roleData.permission ?? []);
      setValue('nama', roleData.nama ?? '');
    }
  }, [roleData, setValue]);
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Edit" additionalPaths={[{ name: "Roles", url: "/role-management" },]} />
      <div className="space-y-6">
        <ComponentCard title="Roles">
          <div className="relative overflow-x-auto sm:rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-5">
                <label htmlFor="nama" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role name</label>
                <input type="text"  {...register("nama", { required: "Role name required"})} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Role name" required />
              </div>
              <div className="grid grid-cols-12 md:grid-cols-8 gap-y-4">
                <label htmlFor="nama" className="col-span-12 mb-2 text-sm font-medium text-gray-900 dark:text-white">Permission :</label>
                {(userManagementData.permissionsData.pages[String(currentPage)] || []).map((permission) => (
                  <label
                    key={permission.id}
                    className="col-span-6 md:col-span-2 inline-flex items-center m-1 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={permission.id}
                      className="sr-only peer"
                      checked={currentPermissions.includes(permission.id)} 
                      onChange={() => handleCheckboxChange(permission.id)}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                    <span className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      {permission.function}
                    </span>
                  </label>
                ))}
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} data={userManagementData.permissionsDataMeta}/>
        </ComponentCard>
      </div>
    </>
  );
}
