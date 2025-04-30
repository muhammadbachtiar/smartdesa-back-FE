import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../../context/features/appSlice';
import { StateContext } from '../../../types/app.type';
import isEqual from 'lodash/isEqual';
import HandleShowToast from '../../../services/utils/handleShowToast';
import { getInfografis } from '../../../api/infografisManagement';
import { setInfografisData, setInfografisDataMeta } from '../../../context/features/infografisManagementSlice';

const useFetchInfografisData = (page: string, search?: string) => {
  const dispatch = useDispatch();
  const infografisContext = useSelector((state: StateContext) => state.infografisManagement);

  const fetchData = useCallback(async () => {
    try {
      const existingData = search
        ? infografisContext.infografisData.searchResults?.[search]?.[page]
        : infografisContext.infografisData.pages?.[page];

      if (!existingData || existingData.length === 0) {
        dispatch(setLoading(true));
      }

      const response = await getInfografis(page, search);

      if (response.status === 200) {
        const fetchedData = response.data?.data;
        const metaData = response.data?.meta;

        if (!isEqual(existingData, fetchedData)) {
          dispatch(setInfografisData({ page, data: fetchedData, search }));
          HandleShowToast('success', 'Data loaded successfully.');
        }

        if (!isEqual(infografisContext.infografisDataMeta, metaData)) {
          dispatch(setInfografisDataMeta(metaData));
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  }, [page, search, dispatch, infografisContext]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { refetchInfografis: fetchData };
};

export default useFetchInfografisData;
