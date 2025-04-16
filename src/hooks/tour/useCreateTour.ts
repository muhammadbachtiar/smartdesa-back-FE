import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { TourForm } from '../../types/tour.type';
import { createTourData } from '../../services/api/tour';

const useCreateTour = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: TourForm) => createTourData(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tours'] });
      navigate('/tour'); // bisa ditambah toast/alert juga      
    },
    onError: (error) => {
      // HandleRespondResponse<TourData>([],"error")
      // alert('Gagal membuat kategori.');
      console.error(error);
    },
  });

  const handleSubmit = (formData: TourForm) => {
    mutation.mutate(formData);
  };

  return {
    isPending: mutation.isPending,
    handleSubmit,
  };
};

export default useCreateTour;
