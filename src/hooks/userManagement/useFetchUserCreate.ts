import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../../api/userManagement';
import { setLoading } from '../../context/features/appSlice';
import { UserForm } from '../../types/form.type';
import { UserData } from '../../types/userManagement.type';
import HandleRespondResponse from '../../services/utils/handleRespondResponse';

const useFetchUserCreate = (data: UserForm | null) => {
  const dispatch = useDispatch();
 
  const fetchData = useCallback(async () => {
    try {
      if (!data) return;
      dispatch(setLoading(true));
      const response = await createUser(data)
      dispatch(setLoading(false));
      HandleRespondResponse<UserData>(response, 'created');
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false)); 
    }
  }, [dispatch, data]);

  useEffect(() => {
    fetchData();
  },[data]);
};

export default useFetchUserCreate;
