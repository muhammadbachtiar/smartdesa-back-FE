import { useMutation, useQueryClient } from '@tanstack/react-query';
// import Swal from 'sweetalert2';
import { TourData } from '../../types/tourManagement.type';
import { createTourData } from '../../services/api/tour';

const useCreateTour = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: TourData) => createTourData(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tours'] });
    },
    onError: (error) => {
      alert("Failed to delete tour");
      console.error("Delete error:", error);
    }
  });

//   const handleDelete = async (id: number, name: string) => {
//     const confirmDelete = await Swal.fire({
//       title: `Are you sure you want to delete this?`,
//       text: `Data to delete: ${name}`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Delete",
//       cancelButtonText: "Cancel",
//     });
//     if (confirmDelete) {
//       mutation.mutate(id);
//     }
//   };

//   return { handleDelete, ...mutation };
// };

export default useCreateTour;
