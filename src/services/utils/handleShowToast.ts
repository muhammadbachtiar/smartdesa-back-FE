import Swal, { SweetAlertIcon } from "sweetalert2";

const HandleShowToast = ( icon: SweetAlertIcon,  text: string ) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    background: '#a5dc86',
    customClass: {
      popup: 'green',
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  })

  Toast.fire({
    icon: icon,
    title: text,
  })
  }

export default HandleShowToast;
