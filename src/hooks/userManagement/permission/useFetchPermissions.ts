import { useEffect, useCallback} from 'react';
import { useDispatch } from 'react-redux';
import { getPermissions } from '../../../api/userManagement';
import { setPermissionData, setPermissionDataMeta } from '../../../context/features/userManagementSlice';
import { StateContext } from '../../../types/app.type';
import { useSelector } from 'react-redux';
import { setLoading } from '../../../context/features/appSlice';
import { isEqual } from 'lodash';
import HandleShowToast from '../../../services/utils/handleShowToast';


const useFetchPermissionData = (page:number) => {
  const dispatch = useDispatch();
  const permissionContext = useSelector((state : StateContext) => state.userManagement);
  const existingPermissionsData = permissionContext.permissionsData
  const fetchPermissionData = useCallback(async () => {
    try{
      if (existingPermissionsData && existingPermissionsData.pages && existingPermissionsData.pages[String(page)] && existingPermissionsData.pages[String(page)].length === 0) {
        dispatch(setLoading(true));
      }
      const response = await getPermissions(page);
      if (response?.status === 200) {

        if(!isEqual(existingPermissionsData.pages[String(page)], response.data?.data)) {
          dispatch(setPermissionData({page: String(page), data:response.data?.data}));
          HandleShowToast('success', 'Data loaded successfully.')
        }
        if(!isEqual(permissionContext.permissionsDataMeta, response.data?.meta)){
          dispatch(setPermissionDataMeta(response.data?.meta));
        }
      }

    } catch (error) {
      console.error(error);
      throw error
    } finally {
      dispatch(setLoading(false));
    }
    
  }, [dispatch, permissionContext, existingPermissionsData, page])
  
  useEffect(() => {
    fetchPermissionData();
  },[fetchPermissionData, page]);
};

export default useFetchPermissionData;
