import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../context/features/appSlice';
import { useSelector } from 'react-redux';
import { StateContext } from '../../../types/app.type';
import isEqual from 'lodash/isEqual';
import HandleShowToast from '../../../services/utils/handleShowToast';
import { getArticles } from '../../../api/articleManagement';
import { setArticleData, setArticleDataMeta } from '../../../context/features/articleManagementSlice';

const useFetchArticleData = (page:string, search?: string | undefined) => {
  const dispatch = useDispatch();
  const articleContext = useSelector((state : StateContext) => state.articleManagement);

  const fetchArticleData = useCallback(async () => {
    try {
      const existingArticleData = search
        ? articleContext.articleData.searchResults?.[search]?.[page]
        : articleContext.articleData.pages?.[page];

      if (!existingArticleData || existingArticleData.length === 0) {
        dispatch(setLoading(true));
      }

      const response = await getArticles(page, search);
      if (response.status === 200) {
        const fethedData = response.data?.data;
        const metaData = response.data?.meta;
        
        if(!isEqual(existingArticleData, fethedData)) {
          dispatch(setArticleData({page: String(page), data: fethedData, search: search}));
          HandleShowToast('success', 'Data loaded successfully.');
        }
        if(!isEqual(articleContext.articleDataMeta, metaData)){
          dispatch(setArticleDataMeta(metaData));
        }
        
      }
    } catch (error) {
      console.error(error);
      throw error
    } finally {
      dispatch(setLoading(false));
    }
  }, [search, articleContext.articleData.searchResults, articleContext.articleData.pages, articleContext.articleDataMeta, page, dispatch]);

  useEffect(() => {
    fetchArticleData();
  },[page, search, fetchArticleData]);
};

export default useFetchArticleData;
