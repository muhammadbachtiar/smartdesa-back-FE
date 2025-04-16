/* eslint-disable react-hooks/exhaustive-deps */
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";
import { useForm } from "react-hook-form";
import { InfografisForm } from "../../../types/infografisForm.type";
import useFetchInfografisCreate from "../../../hooks/articleManagement/infografis/useFetchInfografisCreate";
import { useEffect, useState } from "react";
import ThumbnailArticleUpload from "../../../components/form/input/thumbnailArticleUpload";
import PublishedAtInput from "../../../components/form/form-elements/PublisAtInput";
import MetaInputs from "../../../components/form/form-elements/MetaInputs";

export default function InfografisCreate() {
  const { register, reset, watch, handleSubmit, setValue } =
    useForm<InfografisForm>({
      defaultValues: {        
        title: "",
        description: "",
        link: "",
        published_at: undefined,
        meta: [
          {
            key: "title",
            value: "",
          },
          {
            "key": "description",
            "value": ""
          },
          {
            "key": "keywords",
            "value": ["keyowrds 1", " keywords 2"]
          }
        ],
      },
    });

  const [formData, setFormData] = useState<InfografisForm | null>(null);
  const metaData = watch("meta");
  const publishedAtData = watch('published_at');
  const thumbnail = watch("link");
  const title = watch("title");

  useFetchInfografisCreate(formData);

  const handleImageUpload = (imageUrl: string | undefined) => {
    setValue("link", imageUrl);
  };

  const onSubmit = (data: InfografisForm) => {
    console.log(data)
    setFormData(data);
    reset();
  };

   useEffect(() => {
      const updatedMeta = [...metaData];
      updatedMeta[0]["value"] = title;
      setValue('meta', updatedMeta);
    }, [title]);

  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb
        pageTitle="Create"
        additionalPaths={[
          { name: "Infografis", url: "/infografis-management" },
        ]}
      />
      <div className="space-y-6">
        <ComponentCard title="Infografis">
          <div className="relative overflow-x-auto sm:rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)}>
              <ThumbnailArticleUpload
                initialImageUrl={thumbnail}
                onImageUpload={handleImageUpload}
              />
              <div className="mb-5">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  {...register("title", { required: "Title required" })}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Infografis title"
                  required
                />
              </div>
              <div className="mb-5">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea  {...register("description", { required: "Description required"})} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write category description..." required />
              </div>              
              <div className="mb-5">
                <PublishedAtInput publishedAtData={publishedAtData} setValue={(field, value) => setValue(field as keyof InfografisForm, value)}/>
              </div>
              <div className="mb-5">
                <MetaInputs metaData={metaData} setValue={(field, value) => setValue(field as keyof InfografisForm, value)}/>
              </div>
              <div className="mt-6 justify-items-end text-center">
                <button
                  type="submit"
                  className="px-10 py-3 text-white bg-green-600 rounded hover:bg-green-700"
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
