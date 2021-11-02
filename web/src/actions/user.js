import user from "../api/user";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTH_ERROR,
  LOAD_USER
} from "../types";

export const loadUser = () => async dispatch => {
  try {
    const { data } = await user.get("/authorize");
    dispatch({
      type: LOAD_USER,
      payload: data
    });
  } catch (err) {
    console.error(err);
    if (err.response) {
      alert(err.response.data.error);
    } else {
      alert("unable to authorize");
    }
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const register = values => async dispatch => {
  try {
    const { data } = await user.post("/register", values);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data
    });
    alert(JSON.stringify(data));
    console.log(data);
  } catch (err) {
    console.error(err);
    if (err.response) {
      alert(err.response.data.error);
    } else {
      alert("unable to register");
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

export const login = formValues => async dispatch => {
  try {
    const { data } = await user.post("/login", formValues);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data
    });

    alert(JSON.stringify(data));
  } catch (err) {
    if (err.response) {
      alert(err.response.data.error);
    } else {
      alert("unable to authorize");
    }
    console.error("login error: ", err);
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const logOut = () => ({
  type: LOGOUT
});
