import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { deleteRole } from '../../api/userManagement';
import { setLoading } from '../../context/features/appSlice';
import { RoleData } from '../../types/userManagement.type';
import HandleRespondResponse from '../../services/utils/handleRespondResponse';

const useFetchRoleDelete = (id: number | undefined, onSuccess?: () => void) => {
  const dispatch = useDispatch();
 
  const fetchData = useCallback(async () => {
    try {
      if (!id) return;
      dispatch(setLoading(true));
      const response = await deleteRole(id)
      dispatch(setLoading(false));
      HandleRespondResponse<RoleData>(response, 'deleted');
      if ( onSuccess) {
        console.log('test')
        onSuccess();
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false)); 
    }
  }, [dispatch, id, onSuccess]);

  useEffect(() => {
    fetchData();
  },[id]);
};

export default useFetchRoleDelete;
