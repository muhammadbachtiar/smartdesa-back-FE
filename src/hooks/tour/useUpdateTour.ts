import { updateTourData } from '../../services/api/tour';
import { TourForm } from '../../types/tour.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

export default function useUpdateTour(id: string | undefined) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: TourForm) => updateTourData(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tours'] });
      navigate('/tour');
    }
  });
}