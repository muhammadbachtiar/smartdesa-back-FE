/* eslint-disable react-hooks/exhaustive-deps */
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import { ArticleForm } from "../../types/form.type";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useFetchArticleCreate from "../../hooks/articleManagement/useFetchArticleCreate";
import ThumbnailArticleUpload from "../../components/form/input/thumbnailArticleUpload";
import { articleManagementStateContext, StateContext } from "../../types/app.type";
import { useSelector } from "react-redux";
import useFetchCategoryData from "../../hooks/articleManagement/useFetchCategory";
import Select from "react-select";
import { Editor } from '@tinymce/tinymce-react';
import MetaInputs from "../../components/form/form-elements/MetaInputs";
import { stripHtml } from 'string-strip-html';
import PublishedAtInput from "../../components/form/form-elements/PublisAtInput";


export default function CreateArticle() {
  const articleManagement: articleManagementStateContext  = useSelector((state:StateContext) => state.articleManagement);
  const [searchValue, setSearchValue] = useState('');
  const [categoryOptions, setCategoryOptions] = useState(
                                                          articleManagement.categoryData.pages[1]?.map((category) => ({
                                                            value: category.id,
                                                            label: category.name,
                                                          })) || []
                                                        );
  const { register, reset, handleSubmit, watch, setValue } = useForm<ArticleForm>({
    defaultValues:{
      title: '',
      thumbnail: '',
      content: "",
      category_id: '',
      published_at: new Date().toISOString(),
      meta: [
          {
              "key": "title",
              "value": ""
          },
          {
            "key": "description",
            "value": ""
          },
          {
            "key": "keywords",
            "value": ["keyowrds 1", " keywords 2"]
          }
      ]
    }
  });

  const selectedCategory = watch("category_id")
  const [formData, setFormData] = useState<ArticleForm | null>(null);
  const thumbnail = watch("thumbnail");
  const metaData = watch('meta');
  const publishedAtData = watch('published_at');
  const title = watch('title');
  
  useFetchArticleCreate(formData);
  useFetchCategoryData(String(1), searchValue);
  
  const onSubmit = (data: ArticleForm) => {
    const today = new Date().toISOString().split("T")[0];
    if (data.published_at?.split("T")[0] === today) {
      data = { ...data, published_at: undefined };
    }
    setFormData(data);
    reset(); 
  };

  const handleImageUpload = (imageUrl: string | undefined) => {
    setValue('thumbnail', imageUrl);
  };

  useEffect(() => {
    const formattedOptions: { value: number; label: string }[] = searchValue
      ? (Array.isArray(articleManagement.categoryData.searchResults[searchValue]?.[1])
          ? articleManagement.categoryData.searchResults[searchValue]?.[1].map((category) => ({
              value: category.id,
              label: category.name,
            }))
          : [])
      : articleManagement.categoryData.pages[1]?.map((category) => ({
        value: category.id,
        label: category.name,
      })) || [];
      setCategoryOptions(formattedOptions);
  }, [articleManagement.categoryData.pages, articleManagement.categoryData.searchResults, searchValue]);

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
      <PageBreadcrumb pageTitle="Create" additionalPaths={[{ name: "Article", url: "/article-management" },]} />
      <div className="space-y-6">
        <ComponentCard title="Article">
          <div className="relative overflow-x-auto sm:rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)}>
              <ThumbnailArticleUpload initialImageUrl={thumbnail} onImageUpload={handleImageUpload}/>
              <div className="mb-5">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                <input type="text"  {...register("title", { required: "Name required"})} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Article title" required />
              </div>
              <div className="mb-5">
                <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
                <Editor
                  apiKey='d8k55q6psp77te26w5jqlxu9ub9w1qb03wyel619rj1qk8dm'
                  init={{
                    plugins: [
                      'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                      'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown','importword', 'exportword', 'exportpdf'
                    ],
                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                    tinycomments_mode: 'embedded',
                    tinycomments_author: 'Author name',
                    mergetags_list: [
                      { value: 'First.Name', title: 'First Name' },
                      { value: 'Email', title: 'Email' },
                    ],
                    ai_request: (_request: unknown, respondWith: { string: (arg0: () => Promise<never>) => unknown; }) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                  }}
                  initialValue="Wtrite down the article content ..."
                  onEditorChange={(content) => {setValue("content", content); setValue("description", stripHtml(content).result)}}
                />
                <input type="hidden" {...register("content", { required: "Article content required" })} required/>
              </div>
              <div className="mb-5">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                <Select
                  options={categoryOptions}
                  isSearchable
                  isClearable
                  placeholder="Find Category..."
                  value={categoryOptions.find(option => option.value === Number(selectedCategory)) || null}
                  onInputChange={(value: string) => {setSearchValue(value)}}
                  onChange={(selectedOption) => setValue("category_id", String(selectedOption?.value))}
                />
                <input type="hidden" {...register("category_id")} />
              </div>
              <div className="mb-5">
                <PublishedAtInput publishedAtData={publishedAtData} setValue={(field, value) => setValue(field as keyof ArticleForm, value)}/>
              </div>
              <div className="mb-5">
                <MetaInputs metaData={metaData} setValue={(field, value) => setValue(field as keyof ArticleForm, value)}/>
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
