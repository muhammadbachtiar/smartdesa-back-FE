import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../api/userManagement';
import { setLoading } from '../../../context/features/appSlice';
import { UserForm } from '../../../types/form.type';
import { DetailUserData } from '../../../types/userManagement.type';
import HandleRespondResponse from '../../../services/utils/handleRespondResponse';

const useFetchUserUpdate = (data: UserForm | null, id: string | undefined) => {
  const dispatch = useDispatch();
 
  const fetchUserUpdate = useCallback(async () => {
    try {
      if (!data) return;
      dispatch(setLoading(true));
      const response = await updateUser(data, id)
      dispatch(setLoading(false));
      HandleRespondResponse<DetailUserData>(response, 'updated');
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false)); 
    }
  }, [dispatch, data, id]);

  useEffect(() => {
    fetchUserUpdate();
  },[data]);
};

export default useFetchUserUpdate;
