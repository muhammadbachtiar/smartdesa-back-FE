import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getRoles } from '../../api/userManagement';
import { setRoleData, setRoleDataMeta } from '../../context/features/userManagementSlice';
import { setLoading } from '../../context/features/appSlice';
import { useSelector } from 'react-redux';
import { StateContext } from '../../types/app.type';
import isEqual from 'lodash/isEqual';
import HandleShowToast from '../../services/utils/handleShowToast';

const useFetchRoleData = (page:string, search?: string | undefined) => {
  const dispatch = useDispatch();
  const roleContext = useSelector((state : StateContext) => state.userManagement);

  const fetchData = useCallback(async () => {
    try {
      const existingRoleData = search
        ? roleContext.roleData.searchResults?.[search]?.[page]
        : roleContext.roleData.pages?.[page];

      if (!existingRoleData || existingRoleData.length === 0) {
        dispatch(setLoading(true));
      }

      const response = await getRoles(page, search);
      if (response.status === 200) {
        const fethedData = response.data?.data;
        const metaData = response.data?.meta;
        
        if(!isEqual(existingRoleData, fethedData)) {
          dispatch(setRoleData({page: String(page), data: fethedData, search: search}));
          HandleShowToast('success', 'Data loaded successfully.');
        }
        if(!isEqual(roleContext.roleDataMeta, metaData)){
          dispatch(setRoleDataMeta(metaData));
        }
        
      }
    } catch (error) {
      console.error(error);
      throw error
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, page, roleContext.roleData.pages, roleContext.roleData.searchResults, roleContext.roleDataMeta, search]);

  useEffect(() => {
    fetchData();
  },[page, search]);
};

export default useFetchRoleData;
