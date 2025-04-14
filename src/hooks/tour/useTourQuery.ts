// src/hooks/category/useCategoryQuery.ts
import { useQuery } from '@tanstack/react-query';
import { fetchTourData } from '../../services/api/tour';

const useTourQuery = (page: number, search: string) => {
  return useQuery({
    queryKey: ['tours', page, search],
    queryFn: () => fetchTourData(page, search),
    refetchOnWindowFocus: true,
    // refetchInterval: 5000,
    // keepPreviousData: true, // biar data sebelumnya gak langsung hilang saat loading
    staleTime: 1000 * 60 * 1, // optional: data dianggap fresh selama 1 menit
  });
};

export default useTourQuery;
