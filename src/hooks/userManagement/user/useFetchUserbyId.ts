import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { getUserbyId } from '../../../api/userManagement';
import { DetailUserData } from '../../../types/userManagement.type';
import { setLoading } from '../../../context/features/appSlice';

const useFetchUserbyId = (id:string | undefined) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState<DetailUserData | null>(null);
  
  useEffect(() => {
    const fetchUserbyId = async () => {
      try {
        dispatch(setLoading(true));
        const response = await getUserbyId(id); 
        if (response.status === 200) {
          setUserData(response.data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchUserbyId();
  }, [dispatch, id]);

  return userData;
};

export default useFetchUserbyId;
