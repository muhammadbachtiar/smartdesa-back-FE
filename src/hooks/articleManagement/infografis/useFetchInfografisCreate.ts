import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../context/features/appSlice';
import HandleRespondResponse from '../../../services/utils/handleRespondResponse';
import { InfografisForm } from '../../../types/infografisForm.type';
import { createInfografis } from '../../../api/infografisManagement';
import { InfografisData } from '../../../types/infografisManagement.type';

const useFetchInfografisCreate = (data: InfografisForm | null) => {
  const dispatch = useDispatch();
 
  const fetchData = useCallback(async () => {
    try {
      if (!data) return;
      dispatch(setLoading(true));
      const response = await createInfografis(data);
      dispatch(setLoading(false));
      HandleRespondResponse<InfografisData>(response, 'created');
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

export default useFetchInfografisCreate;
