import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../context/features/appSlice';
import { useSelector } from 'react-redux';
import { StateContext } from '../../../types/app.type';
import isEqual from 'lodash/isEqual';
import HandleShowToast from '../../../services/utils/handleShowToast';
import { getCategories } from '../../../api/articleManagement';
import { setCategoryData, setCategoryDataMeta } from '../../../context/features/categoryManagementSlice';

const useFetchCategoryData = (page:string, search?: string | undefined) => {
  const dispatch = useDispatch();
  const categoryContext = useSelector((state : StateContext) => state.categoryManagement);

  const fetchCategoryData = useCallback(async () => {
    try {
      const existingCategoryData = search
        ? categoryContext.categoryData.searchResults?.[search]?.[page]
        : categoryContext.categoryData.pages?.[page];

      if (!existingCategoryData || existingCategoryData.length === 0) {
        dispatch(setLoading(true));
      }

      const response = await getCategories(page, search);
      if (response.status === 200) {
        const fethedData = response.data?.data;
        const metaData = response.data?.meta;
        
        if(!isEqual(existingCategoryData, fethedData)) {
          dispatch(setCategoryData({page: String(page), data: fethedData, search: search}));
          HandleShowToast('success', 'Data loaded successfully.');
        }
        if(!isEqual(categoryContext.categoryDataMeta, metaData)){
          dispatch(setCategoryDataMeta(metaData));
        }
        
      }
    } catch (error) {
      console.error(error);
      throw error
    } finally {
      dispatch(setLoading(false));
    }
  }, [search, categoryContext.categoryData.searchResults, categoryContext.categoryData.pages, categoryContext.categoryDataMeta, page, dispatch]);

  useEffect(() => {
    fetchCategoryData();
  },[page, search, fetchCategoryData]);
};

export default useFetchCategoryData;
