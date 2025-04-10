import Swal from "sweetalert2";

const HandleDeleteData = async (
    id: number,
    data: { name: string; kind: string },
    setIdToDelete: (id: number) => void
  ) => {
    if (!data || !data.name || !data.kind) {
      console.error("Invalid data passed to HandleDeleteData");
      return;
    }
  
    const result = await Swal.fire({
      title: `Are you sure you want to delete this ${data.kind}?`,
      text: `Data to delete: ${data.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    });
  
    if (result.isConfirmed) {
      setIdToDelete(id);
    }
  };  

export default HandleDeleteData;
