import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";
import Pagination from "../../../components/atoms/Pagination";
import Label from "../../../components/form/Label";
import useFetchUserUpdate from "../../../hooks/userManagement/useFetchUserUpdate";
import { EyeIcon, EyeCloseIcon } from "../../../icons";
import { useSelector } from "react-redux";
import { StateContext } from "../../../types/app.type";
import { userManagementStateContext } from "../../../types/app.type";
import { UserForm } from "../../../types/form.type";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useFetchUserbyId from "../../../hooks/userManagement/useFetchUserbyId";
import { useParams } from "react-router";
import { DetailUserData } from "../../../types/userManagement.type";
import useFetchRoleData from "../../../hooks/userManagement/useFetchRoles";
import ProfileUpload from "../../../components/form/input/profileUpload";

export default function EditUser() {

  const { id } = useParams();
  const userData: DetailUserData | null = useFetchUserbyId(id);
  const userManagementData: userManagementStateContext  = useSelector((state:StateContext) => state.userManagement);
  const { register, watch, setValue, handleSubmit } = useForm<UserForm>({
    defaultValues:{
      name: '',
      email: '',
      password: '',
      roles: [],
      avatar: ''
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [currentPage, setCurrentPage] = useState(userManagementData.roleDataMeta.current_page || 1);
  const [formData, setFormData] = useState<UserForm | null>(null);
  const avatar = watch("avatar");
  
  useFetchRoleData(String(currentPage))
  useFetchUserUpdate(formData, id);
 
  const onSubmit = (data: UserForm) => {
    const transformedData = {
      ...data,
      roles: Array.isArray(data.roles) ? data.roles.map(Number) : [Number(data.roles)],
    };

    if (!data.password) {
      delete transformedData.password;  
    }
    
    setFormData(transformedData);
  };

  const handleImageUpload = (imageUrl: string | undefined) => {
    setValue('avatar', imageUrl);
  };


  useEffect(() => {
      if (userData) {
        setValue('name', userData.name ?? '');
        setValue('email', userData.email ?? '');
        setValue('password', userData.password ?? '');
        setValue('roles', userData.roles ?? []);
        setValue('avatar', userData.avatar ?? '');
      }
    }, [setValue, userData]);

  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Create" additionalPaths={[ { name: "Edit", url: "/user-management" },]} />
      <div className="space-y-6">
        <ComponentCard title="Users">
          <div className="relative overflow-x-auto sm:rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)}>
              <ProfileUpload initialImageUrl={avatar} onImageUpload={handleImageUpload} />
              <div className="mb-5">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input type="text"  {...register("name", { required: "Name required"})} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required />
              </div>
              <div className="mb-5">
                <Label>
                  Email <span className="text-error-500">*</span>{" "}
                </Label>
                <input 
                    type="text"
                    {...register("email", {
                      required: "Email required",
                    })}
                    className="px-3 py-2 w-full border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 disabled:text-gray-300" placeholder="Email" ></input>
              </div>
              <div className="mb-5">
                <Label>
                  Password <span className="text-error-500">*</span>{" "}
                </Label>
                <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className="px-3 py-2 w-full border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 disabled:text-gray-300" placeholder="Password"></input>
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    )}
                  </span>
                </div>
                <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Skip if no change needed.</p>
              </div>
              <div className="grid grid-cols-12">
                <label className="col-span-12 text-gray-700">Roles:</label>
                {(userManagementData.roleData.pages[currentPage] || []).map((role) => (
                  <div key={role.id} className="col-span-6 md:col-span-2 flex items-center mb-4">
                    <input
                      id={`radio-${role.id}`}
                      type="radio"
                      value={role.id}
                      checked={watch("roles")?.includes(role.id)}
                      {...register("roles", {
                        onChange: (e) => {
                          setValue("roles", [parseInt(e.target.value, 10)]); 
                        },
                      })}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`radio-${role.id}`}
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {role.nama}
                    </label>
                  </div>
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
          <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} data={userManagementData.roleDataMeta}/>
        </ComponentCard>
      </div>
    </>
  );
}
