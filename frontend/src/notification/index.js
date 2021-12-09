import { toast } from "react-toastify";

export const successFlag = (message, duration = 3000) => {
  toast.success(message, {
    position: toast.POSITION.TOP_LEFT,
    autoClose: duration,
    pauseOnFocusLoss: false
  });
};

export const errorFlag = message => {
  toast.error(message, {
    autoClose: 3000,
    pauseOnFocusLoss: false
  });
};
