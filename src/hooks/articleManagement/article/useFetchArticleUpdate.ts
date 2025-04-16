import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../context/features/appSlice';
import { ArticleForm } from '../../../types/form.type';
import { useNavigate } from 'react-router';
import HandleRespondResponse from '../../../services/utils/handleRespondResponse';
import { updateArticle } from '../../../api/articleManagement';
import { ArticleData } from '../../../types/articleManagement.type';


const useFetchArticleUpdate = (data: ArticleForm | null, id: string | undefined) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchArticleUpdate = useCallback(async () => {
    try {
      if (!data) return;
      dispatch(setLoading(true));
      const response = await updateArticle(data, id)
      dispatch(setLoading(false));
      HandleRespondResponse<ArticleData>(response, 'updated');
      setTimeout(() => {
        navigate("/article-management");
      }, 0);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false)); 
    }
  }, [data, dispatch, id, navigate]);

  useEffect(() => {
    fetchArticleUpdate();
  },[data]);
};

export default useFetchArticleUpdate;
