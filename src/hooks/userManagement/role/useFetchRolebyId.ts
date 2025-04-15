import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { getRolebyId } from '../../../api/userManagement';
import { RoleData } from '../../../types/userManagement.type';
import { setLoading } from '../../../context/features/appSlice';

const useFetchRolebyId = (id:string | undefined) => {
  const dispatch = useDispatch();
  const [roleData, setRoleData] = useState<RoleData | null>(null);
  
  useEffect(() => {
    const fetchRolebyId = async () => {
      try {
        dispatch(setLoading(true));
        const response = await getRolebyId(id) 
        if (response.status === 200) {
          setRoleData(response.data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchRolebyId();
    console.log('isFetching')
  }, [dispatch, id]);

  return roleData;
};

export default useFetchRolebyId;
