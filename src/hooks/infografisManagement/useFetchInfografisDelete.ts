import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../context/features/appSlice';
import HandleRespondResponse from '../../services/utils/handleRespondResponse';
import { deleteInfografis } from '../../api/infografisManagement';
import { InfografisData } from '../../types/infografisManagement.type';

const useFetchInfografisDelete = (id: number | undefined, onSuccess?: () => void) => {
  const dispatch = useDispatch();
 
  const fetchData = useCallback(async () => {
    try {
      if (!id) return;
      dispatch(setLoading(true));
      const response = await deleteInfografis(id)
      dispatch(setLoading(false));
      HandleRespondResponse<InfografisData>(response, 'deleted');
      if (onSuccess) {
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

export default useFetchInfografisDelete;
