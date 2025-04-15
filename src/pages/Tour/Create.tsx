import { useForm } from 'react-hook-form';
import ComponentCard from '../../components/common/ComponentCard'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import PageMeta from '../../components/common/PageMeta'
import { TourForm } from '../../types/tour.type';

export default function TourPageCreate() {
    
    const { register, handleSubmit } = useForm<TourForm>({
        defaultValues:{
          title: "",
          description: "",
          link: {
            sosmed: [],
            email: "email@email.com",
            website: "http://website.com",
            gmap: "-123.456",
        },
        address: "",
        thumbnail: "",
        latitude: "",
        longitude: "",
        published_at: new Date().toISOString(),
        meta: [
            {
                "key": "meta",
                "value": "meta",
            }
        ]
        },
      });

    return (
        <>
          <PageMeta
            title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
            description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
          />
          <PageBreadcrumb pageTitle="Create" additionalPaths={[{ name: "Tours", url: "/tour" },]} />
          <div className="space-y-6">
            <ComponentCard title="Tour">
              <div className="relative overflow-x-auto sm:rounded-lg">
                <form>
                  <div className="mb-5">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                    <input type="text"  {...register("title", { required: "Title required"})} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title" required />
                  </div>    
                  <div className="mb-5">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <textarea  {...register("description", { required: "Description required"})} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="description..." required />
                  </div>
                  <div className="mb-5">
                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                    <textarea  {...register("address", { required: "Address required"})} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="address..." required />
                  </div>
                  <div className="mb-5">
                    <label htmlFor="latitude" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Latitude</label>
                    <input type="text"  {...register("latitude", { required: "latitude required"})} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Latitude" required />
                  </div>    
                  <div className="mb-5">
                    <label htmlFor="longitude" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Longitude</label>
                    <input type="text"  {...register("longitude", { required: "longitude required"})} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Longitude" required />
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