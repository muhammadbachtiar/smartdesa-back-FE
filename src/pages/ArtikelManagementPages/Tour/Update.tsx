import { useForm } from "react-hook-form";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import { TourForm } from "../../../types/tour.type";
import ThumbnailArticleUpload from "../../../components/form/input/thumbnailArticleUpload";
import MetaInputs from "../../../components/form/form-elements/MetaInputs";
import { useEffect } from "react";
import PublishedAtInput from "../../../components/form/form-elements/PublisAtInput";
import useTourQueryById from "../../../hooks/tour/useUpdateTour";
import { useParams } from "react-router";
import HandleShowToast from "../../../services/utils/handleShowToast";
import { TourData } from "../../../types/tourManagement.type";

export default function TourPageUpdate() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useTourQueryById(id);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TourData>();

  const title = watch("title");
  const publishedAtData = watch("published_at");
  const thumbnail = watch("thumbnail");
  const metaData = watch("meta");
  const linkData = watch("link.sosmed");
  const metaTitle = watch("title");

  // Prefill form saat data sudah didapat
  useEffect(() => {
    if (metaData?.length && metaData[0].value !== metaTitle) {
      const updateMeta = [...metaData];
      updateMeta[0].value = metaTitle;
      setValue("meta", updateMeta);
    }
  }, [setValue, metaData, metaTitle]);
  
  useEffect(() => {    
    if (data?.data) {
      const tour = data.data;
      setValue("thumbnail", tour.thumbnail);
      setValue("title", tour.title);
      setValue("description", tour.description);
      setValue("address", tour.address);
      setValue("link.email", tour.link.email);
      setValue("link.website", tour.link.website);
      setValue("link.gmap", tour.link.gmap);
      setValue("published_at", tour.published_at);      
      setValue("meta",tour.meta ?? [...metaData]);     
      
      // tambahkan setValue untuk field lainnya
    }
  }, [data, setValue, title]);

  if (!id) {
    HandleShowToast("info", "ID tidak ditemukan");
    return null;
  }
  if (isLoading){
    HandleShowToast("info", "Please wait, fetching data...");
    return null;
  }
    
  if (isError){
    HandleShowToast("error", "Error: ${(error as Error).message}");
    return null;
  }

  const onSubmit = (formData: TourData) => {
    console.log('Form submitted:', formData);
    // TODO: panggil mutation edit di sini
  };

  const handleImageUpload = (imageUrl: string | undefined) => {
    setValue("thumbnail", imageUrl);
  };

  const handleAddLink = () => {
    setValue("link.sosmed", [...linkData, { key: "", value: "" }]);
  };

  const handleChangeLink = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const updatedLink = [...linkData];
    updatedLink[index][field] = value;
    setValue("link.sosmed", updatedLink);
  };

  const handleRemoveLink = (index: number) => {
    const updatedLink = linkData.filter((_, i) => i !== index);
    setValue("link.sosmed", updatedLink);
  };

  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb
        pageTitle="Create"
        additionalPaths={[{ name: "Tours", url: "/tour" }]}
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-6">
          <ComponentCard title="Basic info">
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Title"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    {...register("description", {
                      required: "Description required",
                    })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="description..."
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Address
                  </label>
                  <textarea
                    {...register("address", { required: "Address required" })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="address..."
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    {...register("link.email", { required: "email required" })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="website"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Website
                  </label>
                  <input
                    type="text"
                    {...register("link.website", {
                      required: "website required",
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Website"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="gmap"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Gmap
                  </label>
                  <input
                    type="text"
                    {...register("link.gmap", { required: "gmap required" })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Gmap"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="latitude"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Latitude
                  </label>
                  <input
                    type="text"
                    {...register("latitude", { required: "latitude required" })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Latitude"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="longitude"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Longitude
                  </label>
                  <input
                    type="text"
                    {...register("longitude", {
                      required: "longitude required",
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Longitude"
                    required
                  />
                </div>
                <div className="mb-5">
                  <PublishedAtInput
                    publishedAtData={publishedAtData}
                    setValue={(field, value) =>
                      setValue(field as keyof TourForm, value)
                    }
                  />
                </div>
                <div className="mt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </ComponentCard>
        </div>
        <div className="space-y-6">
          {/* <ComponentCard title="Link and Sociamedia">
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Add sociamedia link
              </label>
              <button
                type="button"
                onClick={handleAddLink}
                className="mb-3 p-2 text-white bg-blue-600 rounded disabled:bg-blue-400 hover:bg-blue-700 disabled:cursor-not-allowed"
                disabled={linkData.length === 5}
              >
                Add link
              </button>
              {linkData.map((link, index) => (
                <div key={index} className="flex items-center space-x-3 mb-3">
                  <input
                    type="text"
                    placeholder="Socialmedia"
                    value={link.key}
                    required
                    onChange={(e) =>
                      handleChangeLink(index, "key", e.target.value)
                    }
                    className="w-1/3 p-2 border rounded disabled:bg-gray-100 dark:bg-gray-700 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Link"
                    value={link.value}
                    required
                    onChange={(e) =>
                      handleChangeLink(index, "value", e.target.value)
                    }
                    className="w-2/3 p-2 border rounded disabled:bg-gray-100 dark:bg-gray-700 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveLink(index)}
                    className="p-2 text-white bg-red-600 rounded disabled:bg-red-400 disabled:cursor-not-allowed hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </ComponentCard> */}

          <ComponentCard title="Meta">
            <div className="mb-5">
              <MetaInputs
                metaData={metaData}
                setValue={(field, value) =>
                  setValue(field as keyof TourForm, value)
                }
              />
            </div>
          </ComponentCard>
        </div>
      </div>
    </>
  );
}
