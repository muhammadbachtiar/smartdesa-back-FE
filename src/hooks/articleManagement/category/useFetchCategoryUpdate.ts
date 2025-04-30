import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../context/features/appSlice';
import { CategoryForm } from '../../../types/form.type';
import { useNavigate } from 'react-router';
import HandleRespondResponse from '../../../services/utils/handleRespondResponse';
import { updateCategory } from '../../../api/articleManagement';
import { CategoryData } from '../../../types/categoryManagement.type';


const useFetchCategoryUpdate = (data: CategoryForm | null, id: string | undefined) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchCategoryUpdate = useCallback(async () => {
    try {
      if (!data) return;
      dispatch(setLoading(true));
      const response = await updateCategory(data, id)
      dispatch(setLoading(false));
      HandleRespondResponse<CategoryData>(response, 'updated');
      setTimeout(() => {
        navigate("/category-management");
      }, 0);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false)); 
    }
  }, [data, dispatch, id, navigate]);

  useEffect(() => {
    fetchCategoryUpdate();
  },[data]);
};

export default useFetchCategoryUpdate;
