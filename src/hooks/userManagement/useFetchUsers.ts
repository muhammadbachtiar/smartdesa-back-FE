import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getUsers } from '../../api/userManagement';
import { setUserData, setUserDataMeta } from '../../context/features/userManagementSlice';
import { setLoading } from '../../context/features/appSlice';
import { useSelector } from 'react-redux';
import { StateContext } from '../../types/app.type';
import isEqual from 'lodash/isEqual';
import HandleShowToast from '../../services/utils/handleShowToast';

const useFetchUserData = (page:string, search?: string) => {
  const dispatch = useDispatch();
  const userData = useSelector((state : StateContext) => state.userManagement);
 
  const fetchData = useCallback(async () => {
    try {
      if (userData.userData && userData.userData.length === 0) {
        dispatch(setLoading(true));
      }
      const response = await getUsers(page, search);
      if (response.status === 200) {
        dispatch(setUserData(response.data?.data));
        dispatch(setUserDataMeta(response.data?.meta));
        dispatch(setLoading(false));
        
        if(!isEqual(userData.userData, response.data?.data) || !isEqual(userData.userDataMeta, response.data?.meta) ) {
          HandleShowToast('success', 'Data loaded successfully.')
        }
      }
    } catch (error) {
      console.error(error);
      throw error
    }
  }, [dispatch, page, userData, search]);

  useEffect(() => {
    fetchData();
},[page, search]);
};

export default useFetchUserData;
