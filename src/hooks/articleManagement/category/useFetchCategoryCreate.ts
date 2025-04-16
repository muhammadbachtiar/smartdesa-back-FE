import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../context/features/appSlice';
import { CategoryForm } from '../../../types/form.type';
import HandleRespondResponse from '../../../services/utils/handleRespondResponse';
import { createCategory } from '../../../api/articleManagement';
import { CategoryData } from '../../../types/categoryManagement.type';

const useFetchCategoryCreate = (data: CategoryForm | null) => {
  const dispatch = useDispatch();
 
  const fetchCategoryCreate = useCallback(async () => {
    try {
      if (!data) return;
      dispatch(setLoading(true));
      const response = await createCategory(data);
      console.log(response)
      dispatch(setLoading(false));
      HandleRespondResponse<CategoryData>(response, 'created');
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false)); 
    }
  }, [dispatch, data]);

  useEffect(() => {
    fetchCategoryCreate();
  },[data]);
};

export default useFetchCategoryCreate;
