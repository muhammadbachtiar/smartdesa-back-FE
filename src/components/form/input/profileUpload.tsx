import React, { useState, useCallback, useEffect } from 'react';
import { uploadFile } from '../../../api/userManagement';
import FileInput from './FileInput';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../context/features/appSlice';

interface ProfileUploadProps {
  initialImageUrl?: string | null;
  onImageUpload: (imageUrl: string | undefined) => void;
}

const ProfileUpload: React.FC<ProfileUploadProps> = ({ initialImageUrl, onImageUpload }) => {
  const [imageUrl, setImageUrl] = useState<string | undefined | null>(initialImageUrl);
  const [errorInfo, setErrorInfo] = useState<{errorStatus:boolean, errorMessage:string}>({errorStatus:false ,errorMessage:""});
  const dispatch = useDispatch();
  const handleImageChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

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
    } finally {
      dispatch(setLoading(false));
    }
  }, [onImageUpload]);

  useEffect(() => {
    setImageUrl(initialImageUrl);
  }, [initialImageUrl]);

  return (
    <div className='grid grid-cols-1 justify-items-center gap-2'>
        <img width={150} className='col-span-1' src={imageUrl || "/images/user/default-user.png"} ></img>
        <FileInput onChange={handleImageChange} hint={errorInfo.errorMessage} error={errorInfo.errorStatus} className="w-1/2" />
          <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Max file size 500kb, file allowed: jpn, png, webp</p>
    </div>
  );
};

export default ProfileUpload;