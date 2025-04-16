import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { uploadFile } from '../api/userManagement';
import { setLoading } from '../context/features/appSlice';
import HandleRespondResponse from '../services/utils/handleRespondResponse';

const useFetchUploadFile = (data: FormData | null) => {
  const dispatch = useDispatch();
 
  const fetchUploadFile = useCallback(async () => {
    try {
      if (!data) return;
      dispatch(setLoading(true));
      const response = await uploadFile(data)
      dispatch(setLoading(false));
      HandleRespondResponse<{url : string}>(response, 'created');
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false)); 
    }
  }, [dispatch, data]);

  useEffect(() => {
    fetchUploadFile();
  },[data]);
};

export default useFetchUploadFile;
