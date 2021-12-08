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

export const postStatus = (message, duration = 3000, error = false) => {
  if (!error) {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: duration,
      pauseOnFocusLoss: false
    });
  } else {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: duration,
      pauseOnFocusLoss: false
    });
  }
};

export const commentStatus = (message, duration = 3000, error = false) => {
  if (!error) {
    toast.success(message, {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: duration,
      pauseOnFocusLoss: false
    });
  } else {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: duration,
      pauseOnFocusLoss: false
    });
  }
};
