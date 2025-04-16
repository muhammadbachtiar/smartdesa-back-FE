import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { setLoading } from '../../../context/features/appSlice';
import { InfografisData } from '../../../types/infografisManagement.type';
import { getInfografisbyId } from '../../../api/infografisManagement';

const useFetchInfografisbyId = (id:string | undefined) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState<InfografisData | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));
        const response = await getInfografisbyId(id) 
        if (response.status === 200) {
          setUserData(response.data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [dispatch, id]);

  return userData;
};

export default useFetchInfografisbyId;
