import React, { useState, useCallback, useEffect } from 'react';
import { uploadFile } from '../../../api/userManagement';
import FileInput from './FileInput';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../context/features/appSlice';

interface ThumbnailArticleUploadProps {
  initialImageUrl?: string | null;
  onImageUpload: (imageUrl: string | undefined) => void;
}

const ThumbnailArticleUpload: React.FC<ThumbnailArticleUploadProps> = ({ initialImageUrl, onImageUpload }) => {
  const [imageUrl, setImageUrl] = useState<string | undefined | null>(initialImageUrl);
  const [errorInfo, setErrorInfo] = useState<{errorStatus:boolean, errorMessage:string}>({errorStatus:false ,errorMessage:""});
  const dispatch = useDispatch();
  const handleImageChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setErrorInfo({errorStatus:true ,errorMessage:"File Required"});
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setErrorInfo({errorStatus:true ,errorMessage:"File type is not allowed"});
      return;
    }

    const maxSize = 0.5 * 1024 * 1024; 
    if (file.size > maxSize) {
      setErrorInfo({errorStatus:true ,errorMessage:"File size too large"});
      return;
    }

    setErrorInfo({errorStatus:false ,errorMessage:""});
    
    try {
       dispatch(setLoading(true));
      const formData = new FormData();
      formData.append('upload', file);

      const response = await uploadFile(formData);

      const uploadedImageUrl = response.data?.data.url; 
      setImageUrl(uploadedImageUrl);
      if(uploadedImageUrl){
        onImageUpload(uploadedImageUrl);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }finally {
      dispatch(setLoading(false));
    }
  }, [onImageUpload]);

  useEffect(() => {
    setImageUrl(initialImageUrl);
  }, [initialImageUrl]);

  return (
    <div className='grid w-full grid-cols-1 justify-items-center gap-2'>
        <div className='col-span-1 w-full justify-items-center max-h-96'>
          <img className='h-full'  src={imageUrl || "/images/default-thumbnail.png"} ></img>
        </div>
        <div className='py-3 col-span-1 w-full'>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Upload thumnail</label>
          <FileInput onChange={handleImageChange} hint={errorInfo.errorMessage} error={errorInfo.errorStatus} className="w-full" />
          <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Max file size 500kb, file allowed: jpn, png, webp</p>
        </div>
    </div>
  );
};

export default ThumbnailArticleUpload;