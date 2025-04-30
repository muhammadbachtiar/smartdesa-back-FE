import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../../api/userManagement';
import { setLoading } from '../../../context/features/appSlice';
import { UserData } from '../../../types/userManagement.type';
import HandleRespondResponse from '../../../services/utils/handleRespondResponse';
import { clearUserManagementData } from '../../../context/features/userManagementSlice';

const useFetchUserDelete = (id: number | undefined) => {
  const dispatch = useDispatch();
 
  const fetchUserDelete = useCallback(async () => {
    try {
      if (!id) return;
      dispatch(setLoading(true));
      const response = await deleteUser(id)
      dispatch(setLoading(false));
      HandleRespondResponse<UserData>(response, 'deleted');
      dispatch(clearUserManagementData());
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false)); 
    }
  }, [dispatch, id]);

  useEffect(() => {
    fetchUserDelete();
  },[id]);
};

export default useFetchUserDelete;
