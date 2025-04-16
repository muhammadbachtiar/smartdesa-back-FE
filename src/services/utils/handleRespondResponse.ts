import Swal from "sweetalert2";
import { ResponseCreateDataType } from "../../types/response.type";
import HandleShowAlert from "./handleShowAlert";

const HandleRespondResponse = <T>(
    response: ResponseCreateDataType<{data:T}, {data: {message: string, data: string[]}}>,
    action: string,
  ) => {
       if (String(response.status).startsWith('2')) { 
        Swal.fire(`${action}!`, `Your data has been ${action}.`, "success");
      } else {
          const errorMessage = [
            response.response?.data?.message,
            response.response?.data?.data
              ? Object.entries(response.response.data.data)
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
          
            HandleShowAlert('error', response.message, errorMessage);
      }
  };  

export default HandleRespondResponse;
