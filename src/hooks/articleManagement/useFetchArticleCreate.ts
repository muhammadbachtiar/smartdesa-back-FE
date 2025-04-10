import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../context/features/appSlice';
import { ArticleForm } from '../../types/form.type';
import HandleRespondResponse from '../../services/utils/handleRespondResponse';
import { createArticle } from '../../api/articleManagement';
import { ArticleData } from '../../types/articleManagement.type';

const useFetchArticleCreate = (data: ArticleForm | null) => {
  const dispatch = useDispatch();
 
  const fetchData = useCallback(async () => {
    try {
      if (!data) return;
      dispatch(setLoading(true));
      const response = await createArticle(data);
      dispatch(setLoading(false));
      HandleRespondResponse<ArticleData>(response, 'created');
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false)); 
    }
  }, [dispatch, data]);

  useEffect(() => {
    fetchData();
  },[data]);
};

export default useFetchArticleCreate;
