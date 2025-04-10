import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateRole } from '../../api/userManagement';
import { setLoading } from '../../context/features/appSlice';
import { RoleForm } from '../../types/form.type';
import { RoleData } from '../../types/userManagement.type';
import { useNavigate } from 'react-router';
import HandleRespondResponse from '../../services/utils/handleRespondResponse';


const useFetchRoleUpdate = (data: RoleForm | null, id: string | undefined) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      if (!data) return;
      dispatch(setLoading(true));
      const response = await updateRole(data, id)
      dispatch(setLoading(false));
      HandleRespondResponse<RoleData>(response, 'updated');
      setTimeout(() => {
        navigate("/role-management");
      }, 0);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false)); 
    }
  }, [data, dispatch, id, navigate]);

  useEffect(() => {
    fetchData();
  },[data]);
};

export default useFetchRoleUpdate;
