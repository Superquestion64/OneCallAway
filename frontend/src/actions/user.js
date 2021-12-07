import user from "../api/user";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTH_ERROR,
  LOAD_USER,
  GET_CALL_LOG
} from "./types";

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
      console.log("unable to load user");
    } else {
      // alert("unable to authorize");
      console.log("unable to authorize");
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
    console.log("register data", data);
  } catch (err) {
    console.error(err);
    if (err.response) {
      alert(err.response.data);
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

    console.log("login data", data);
  } catch (err) {
    if (err.response) {
      alert(err.response.data);
    } else {
      alert("unable to authorize");
    }
    console.error("login error: ", err);
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const logOut = () => async dispatch => {
  try {
    const { data } = await user.get("/logout");
    dispatch({
      type: LOGOUT,
      payload: data
    });
    alert(JSON.stringify(data));
  } catch (err) {
    if (err.response) {
      alert(err.response.data);
    } else {
      alert("Unable to Logout");
    }
    console.error("logout error: ", err);
  }
};

export const getCallLog = () => async dispatch => {
  try {
    const { data } = await user.get("/call/GetCallLog");
    dispatch({
      type: GET_CALL_LOG,
      payload: data
    });
    console.log("call log", data);
  } catch (err) {
    alert("unable to fetch call log");
    console.error(err);
  }
};
