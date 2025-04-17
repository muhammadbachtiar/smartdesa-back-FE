import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { deleteBulkTourData } from '../../services/api/tour';

const useDeleteBulkTour = (refetch: () => void) => {
  const mutation = useMutation({
    mutationFn: (id: number[]) => deleteBulkTourData(id),
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      alert("Failed to delete tour");
      console.error("Delete error:", error);
    }
  });

    // const handleDeleteSelected = async () => {
  //   const confirmed = window.confirm(`Are you sure you want to delete ${selectedIds.length} tours?`);
  //   if (!confirmed) return;

  //   try {

  //     await axios.post('/api/tours/delete-batch', { ids: selectedIds });

  //     setSelectedIds([]);
  //     refetch();
  //   } catch (error) {
  //     console.error("Failed to delete selected tours:", error);
  //     alert("Error deleting selected tours");
  //   }
  // };

  const handleDeleteBulkTour = async (ids: number[]) => {
    const confirmDelete = await Swal.fire({
      title: `Are you sure you want to delete ${ids.length} tour(s)?`,
      text: `Data to delete: ${ids.length} tours(s)`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    });

    if (confirmDelete.isConfirmed) {
      mutation.mutate(ids);
    }
  };

  return { handleDeleteBulkTour, ...mutation };
};

export default useDeleteBulkTour;