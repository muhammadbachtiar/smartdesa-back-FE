import Swal, { SweetAlertIcon } from "sweetalert2";

const HandleShowAlert = ( icon: SweetAlertIcon, title: string, text?: string, html?: string ) => {
      Swal.fire({
        icon: icon,
        title: title,
        text: text,
        html: html,
        showConfirmButton: true,
        confirmButtonText: 'Close',
      });
  }

export default HandleShowAlert;
