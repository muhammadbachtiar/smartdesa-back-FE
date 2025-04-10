import Swal from "sweetalert2";
import { AxiosError } from "axios";

const HandleRespondError = (
    error: AxiosError<{code: number,data: [key:string], message: string, success: boolean}>
  ) => {
    const errorMessage = [
      error.response?.data?.message,
      error.response?.data?.data
        ? Object.entries(error.response.data.data)
            .map(([field, errors]) => {
              if (Array.isArray(errors)) {
                return `${field}: ${errors.join(", ")}`;
              }
              return `${field}: [Unknown error format]`;
            })
            .join("\n")
        : null,
    ]
      .filter(Boolean)
      .join("\n");
    Swal.fire({
      icon: "error",
      title: error.message,
      text: errorMessage,
      showConfirmButton: true,
      confirmButtonText: "Close",
    });
  };  

export default HandleRespondError;
