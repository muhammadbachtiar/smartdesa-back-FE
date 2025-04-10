import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../context/features/appSlice';
import HandleRespondResponse from '../../services/utils/handleRespondResponse';
import { CategoryData } from '../../types/articleManagement.type';
import { deleteCategory } from '../../api/articleManagement';

const useFetchCategoryDelete = (id: number | undefined, onSuccess?: () => void) => {
  const dispatch = useDispatch();
 
  const fetchData = useCallback(async () => {
    try {
      if (!id) return;
      dispatch(setLoading(true));
      const response = await deleteCategory(id)
      dispatch(setLoading(false));
      HandleRespondResponse<CategoryData>(response, 'deleted');
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false)); 
    }
  }, [dispatch, id, onSuccess]);

  useEffect(() => {
    fetchData();
  },[id]);
};

export default useFetchCategoryDelete;
