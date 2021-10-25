//Set global headers for all axios objects
const setAuthToken = token => {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
};

export default setAuthToken;
