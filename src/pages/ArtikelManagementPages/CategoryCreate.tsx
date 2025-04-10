import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import { CategoryForm } from "../../types/form.type";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useFetchCategoryCreate from "../../hooks/articleManagement/useFetchCategoryCreate";

export default function CreateCategory() {

  const { register, reset, handleSubmit } = useForm<CategoryForm>({
    defaultValues:{
      name: '',
      description: ""
    },
  });

  const [formData, setFormData] = useState<CategoryForm | null>(null);
  
  useFetchCategoryCreate(formData);
  
  const onSubmit = (data: CategoryForm) => {
    setFormData(data);
    reset(); 
  };

  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Create" additionalPaths={[{ name: "Category", url: "/category-management" },]} />
      <div className="space-y-6">
        <ComponentCard title="Category">
          <div className="relative overflow-x-auto sm:rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-5">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category name</label>
                <input type="text"  {...register("name", { required: "Name required"})} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Category name" required />
              </div>

              <div className="mb-5">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea  {...register("description", { required: "Description required"})} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write category description..." required />
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
        </ComponentCard>
      </div>
    </>
  );
}
