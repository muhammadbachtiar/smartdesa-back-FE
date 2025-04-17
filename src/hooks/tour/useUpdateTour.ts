import { useQuery } from '@tanstack/react-query';
import { fetchTourDataById } from '../../services/api/tour';

const useTourQueryById = (id: string | undefined) => {
  return useQuery({    
    queryKey: ['tours', id],
    queryFn: () => fetchTourDataById(id),
  });
};

export default useTourQueryById;
