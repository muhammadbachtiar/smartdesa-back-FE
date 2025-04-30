import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getUsers } from '../../../api/userManagement';
import { setUserData, setUserDataMeta } from '../../../context/features/userManagementSlice';
import { setLoading } from '../../../context/features/appSlice';
import { useSelector } from 'react-redux';
import { StateContext } from '../../../types/app.type';
import isEqual from 'lodash/isEqual';
import HandleShowToast from '../../../services/utils/handleShowToast';

const useFetchUserData = (page:string, search?: string) => {
  const dispatch = useDispatch();
  const userData = useSelector((state : StateContext) => state.userManagement);
 
  const fetchUserData = useCallback(async () => {
    try {
      const existingUserData = search
        ? userData.userData.searchResults?.[search]?.[page]
        : userData.userData.pages?.[page];

      if (!existingUserData || existingUserData.length === 0) {
        dispatch(setLoading(true));
      }

      const response = await getUsers(page, search);
      
      if (response.status === 200) {
        const fethedData = response.data?.data;
        const metaData = response.data?.meta;
        
        if(!isEqual(existingUserData, fethedData)) {
          dispatch(setUserData({page: String(page), data: fethedData, search: search}));
          HandleShowToast('success', 'Data loaded successfully.');
        }
        if(!isEqual(userData.userDataMeta, metaData)){
          dispatch(setUserDataMeta(metaData));
        }
        
      }
    } catch (error) {
      console.error(error);
      throw error
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, page, userData, search]);

  useEffect(() => {
    fetchUserData();
},[fetchUserData, page, search]);
};

export default useFetchUserData;
