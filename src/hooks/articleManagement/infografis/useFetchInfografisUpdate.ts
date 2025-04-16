import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../context/features/appSlice';
import { useNavigate } from 'react-router';
import HandleRespondResponse from '../../../services/utils/handleRespondResponse';
import { InfografisForm } from '../../../types/infografisForm.type';
import { updateInfografis } from '../../../api/infografisManagement';
import { InfografisData } from '../../../types/infografisManagement.type';


const useFetchInfografisUpdate = (data: InfografisForm | null, id: string | undefined) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      if (!data) return;
      dispatch(setLoading(true));
      const response = await updateInfografis(data, id)
      dispatch(setLoading(false));
      HandleRespondResponse<InfografisData>(response, 'updated');
      setTimeout(() => {
        navigate("/infografis-management");
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

export default useFetchInfografisUpdate;
