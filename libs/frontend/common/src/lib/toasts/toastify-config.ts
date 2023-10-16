import { ToastOptions, toast } from 'react-toastify';
export const showToast = (
  message: string,
  type = 'default',
  duration = 3000
) => {
  const toastOptions: ToastOptions = {
    position: 'top-right',
    autoClose: duration,
  };

  switch (type) {
    case 'success':
      toast.success(message, toastOptions);
      break;
    case 'warning':
      toast.warning(message, toastOptions);
      break;
    case 'error':
      toast.error(message, toastOptions);
      break;
    default:
      toast(message, toastOptions);
  }
};
