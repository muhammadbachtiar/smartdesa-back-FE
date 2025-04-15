import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../context/features/appSlice';
import HandleRespondResponse from '../../services/utils/handleRespondResponse';
import { deleteCategory } from '../../api/articleManagement';
import { CategoryData } from '../../types/categoryManagement.type';
import { clearCategoryManagementData } from '../../context/features/categoryManagementSlice';

const useFetchCategoryDelete = (id: number | undefined, onSuccess?: () => void) => {
  const dispatch = useDispatch();
 
  const fetchData = useCallback(async () => {
    try {
      if (!id) return;
      dispatch(setLoading(true));
      const response = await deleteCategory(id)
      dispatch(setLoading(false));
      HandleRespondResponse<CategoryData>(response, 'deleted');      
      dispatch(clearCategoryManagementData());
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
