import user from "../api/user";

//Set global headers for all axios objects
const setAuthToken = token => {
  if (token) {
    localStorage.setItem("token", token);
    user.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete user.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
};

export default setAuthToken;
