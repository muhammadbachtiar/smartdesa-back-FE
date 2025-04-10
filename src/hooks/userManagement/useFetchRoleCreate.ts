import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { createRole } from '../../api/userManagement';
import { setLoading } from '../../context/features/appSlice';
import { RoleForm } from '../../types/form.type';
import { RoleData } from '../../types/userManagement.type';
import HandleRespondResponse from '../../services/utils/handleRespondResponse';

const useFetchRoleCreate = (data: RoleForm | null) => {
  const dispatch = useDispatch();
 
  const fetchData = useCallback(async () => {
    try {
      if (!data) return;
      dispatch(setLoading(true));
      const response = await createRole(data)
      dispatch(setLoading(false));
      HandleRespondResponse<RoleData>(response, 'created');
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

export default useFetchRoleCreate;
