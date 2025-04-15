import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { InfografisData } from "../../../types/infografisManagement.type";
import { InfografisForm } from "../../../types/infografisForm.type";
import useFetchInfografisUpdate from "../../../hooks/infografisManagement/useFetchInfografisUpdate";
import useFetchInfografisbyId from "../../../hooks/infografisManagement/useFetchInfografisbyid";
import Label from "../../../components/form/Label";
import { CalenderIcon } from "../../../icons";
import Flatpickr from "react-flatpickr";
import ThumbnailArticleUpload from "../../../components/form/input/thumbnailArticleUpload";

export default function InfografisEdit() {
  const { id } = useParams();
  const detailInfografisData: InfografisData | null =
    useFetchInfografisbyId(id);

  const { watch, register, reset, handleSubmit, setValue, getValues } =
    useForm<InfografisForm>({
      defaultValues: {
        title: "",
        description: "",
        link: "",
        published_at: new Date().toISOString(),
        meta: [
          {
            key: "info",
            value: "muara_enim",
          },
        ],
      },
    });

  const [formData, setFormData] = useState<InfografisForm | null>(null);

  const thumbnail = watch("link");
  const metaData = watch("meta");

  useFetchInfografisUpdate(formData, id);

  const onSubmit = (data: InfografisForm) => {
    setFormData(data);
    reset();
  };

  const formatDate = (dateInput: string) => {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handleImageUpload = (imageUrl: string | undefined) => {
    setValue("link", imageUrl);
  };

  const handleAddMeta = () => {
    setValue("meta", [...metaData, { key: "", value: "" }]);
  };

  const handleMetaChange = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const updatedMeta = [...metaData];
    updatedMeta[index][field] = value;
    setValue("meta", updatedMeta);
  };

  const handleRemoveMeta = (index: number) => {
    const updatedMeta = metaData.filter((_, i) => i !== index);
    setValue("meta", updatedMeta);
  };

  useEffect(() => {
    if (detailInfografisData) {
      setValue("title", detailInfografisData.title ?? "");
      setValue("description", detailInfografisData.description ?? "");
      setValue("link", detailInfografisData.link ?? "");
      setValue(
        "published_at",
        detailInfografisData.published_at ?? new Date().toISOString()
      );
    }
  }, [detailInfografisData, setValue]);

  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb
        pageTitle="Update"
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
              <div>
                <Label htmlFor="datePicker">Published At</Label>
                <div className="relative w-full flatpickr-wrapper">
                  <Flatpickr
                    value={getValues("published_at") || undefined}
                    onChange={(selectedDates) => {
                      if (selectedDates.length > 0) {
                        setValue(
                          "published_at",
                          formatDate(selectedDates.toString())
                        );
                      }
                    }}
                    options={{
                      dateFormat: "Y-m-d",
                    }}
                    placeholder="Select an option"
                    className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700  dark:focus:border-brand-800"
                  />
                  <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                    <CalenderIcon className="size-6" />
                  </span>
                </div>
              </div>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  SEO Metadata
                </label>
                <button
                  type="button"
                  onClick={handleAddMeta}
                  className="mb-3 p-2 text-white bg-blue-600 rounded disabled:bg-blue-400 hover:bg-blue-700 disabled:cursor-not-allowed"
                  disabled={metaData.length === 5}
                >
                  Add Meta
                </button>
                {metaData.map((meta, index) => (
                  <div key={index} className="flex items-center space-x-3 mb-3">
                    <input
                      type="text"
                      placeholder="Key"
                      value={meta.key}
                      required
                      disabled={index === 0}
                      onChange={(e) =>
                        handleMetaChange(index, "key", e.target.value)
                      }
                      className="w-1/3 p-2 border rounded disabled:bg-gray-100 dark:bg-gray-700 dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="Value"
                      value={meta.value}
                      required
                      disabled={index === 0}
                      onChange={(e) =>
                        handleMetaChange(index, "value", e.target.value)
                      }
                      className="w-2/3 p-2 border rounded disabled:bg-gray-100 dark:bg-gray-700 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveMeta(index)}
                      disabled={index === 0}
                      className="p-2 text-white bg-red-600 rounded disabled:bg-red-400 disabled:cursor-not-allowed hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
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
