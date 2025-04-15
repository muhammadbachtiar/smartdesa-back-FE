import React from 'react';
import { PlusIcon, TrashBinIcon } from '../../../icons';
import CreatableSelect from 'react-select/creatable';

interface Meta {
    key: string;
    value: string | string[];
  }

interface MetaInputsProps {
  metaData: Meta[],
  setValue: (field: string, value: Meta[]) => void;
}

const MetaInputs: React.FC<MetaInputsProps> = ({ metaData, setValue }) => {
      const handleAddMeta = (type: "array" | "string") => {
        const newMeta = type === "array" ? { key: "", value: [] } : { key: "", value: "" };
        setValue("meta", [...metaData, newMeta]);
      };
    
      const handleMetaChange = (index:number, field: "key" | "value", value:string | string[]) => {
        const updatedMeta = [...metaData];
        if (field === "value") {
          if (Array.isArray(value)) {
            updatedMeta[index].value = value;
          } else {
            updatedMeta[index].value = value as string;
          }
        } else {
          updatedMeta[index][field] = value as string;
        }
        setValue('meta', updatedMeta);
      };
    
     
      const handleRemoveMeta = (index:number) => {
        const updatedMeta = metaData.filter((_, i) => i !== index);
        setValue('meta', updatedMeta);
      };

  return (
    <>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SEO Metadata</label>
        <button
            type="button"
            onClick={() => handleAddMeta("string")}
            className="mr-3 p-2 text-white bg-blue-600 rounded disabled:bg-blue-400 hover:bg-blue-700 disabled:cursor-not-allowed"
            disabled={metaData.length === 5}
            >
            <PlusIcon className="fill-white inline dark:fill-gray-400 size-5" /> (Single Value)
            </button>

            <button
            type="button"
            onClick={() => handleAddMeta("array")}
            className="mb-3 p-2 text-white bg-yellow-500 rounded disabled:bg-yellow-400 hover:bg-yellow-700 disabled:cursor-not-allowed"
            disabled={metaData.length === 5}
            >
            <PlusIcon className="fill-white inline dark:fill-gray-400 size-5" /> (Multiple Value)
            </button>
            { Array.isArray(metaData) && metaData.map((meta, index) => (
            <div key={index} className="flex items-center space-x-3 mb-3">
                <input
                type="text"
                placeholder="Key"
                value={meta.key}
                required
                disabled={index === 0}
                onChange={(e) => handleMetaChange(index, "key", e.target.value)}
                className="w-1/3 p-2 border rounded disabled:bg-gray-100 dark:bg-gray-700 dark:text-white"
                />
                    {Array.isArray(meta.value) && Array.isArray(metaData[index].value) ? (
                        <CreatableSelect
                        isMulti
                        required
                        options={[]} 
                        value={metaData[index].value.map((value: string) => ({ value, label: value }))}
                        onChange={(newValue) => {
                            const updatedValue = newValue.map((option) => option.value); 
                            handleMetaChange(index, "value", updatedValue); 
                        }}
                        placeholder="Type or select keywords"
                        className="w-2/3 rounded disabled:bg-gray-100 dark:bg-gray-700 dark:text-white"
                        />
                    )                   
                    : (
                    <input
                        type="text"
                        className="w-2/3 p-2 border rounded disabled:bg-gray-100 dark:bg-gray-700 dark:text-white"
                        value={meta.value}
                        disabled={index === 0}
                        required
                        onChange={(e) => handleMetaChange(index, "value", e.target.value)}
                        placeholder="Enter meta value"
                    />
                    )}
                <button
                type="button"
                onClick={() => handleRemoveMeta(index)}
                disabled={index === 0}
                className="p-2 text-white bg-red-600 rounded disabled:bg-red-400 disabled:cursor-not-allowed hover:bg-red-700"
                >
                <TrashBinIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                </button>
            </div>
        ))}
        <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Meta input provides metadata about your content. It enhances visibility in search engines.</p>
        <p id="helper-text-explanation" className="text-sm text-gray-500 dark:text-gray-400"><strong>Meta keys:</strong> title, description, keywords (multiple), author, language (multiple), etc.</p>
    </>
  );
};

export default MetaInputs;