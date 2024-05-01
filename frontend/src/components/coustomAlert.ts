import Swal, { SweetAlertIcon } from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});
export const coustomAlert = (icon: SweetAlertIcon, message:string) => {
    Toast.fire({
      icon: icon,
      title: message
    });
  }