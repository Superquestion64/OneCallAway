import user from "../api/user";
import {
  AUTH_ERROR,
  GET_CALL_LOG,
  LOAD_USER,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS
} from "./types";
import { successFlag, errorFlag } from "../notification";

export const loadUser = () => async dispatch => {
  try {
    const { data } = await user.get("/authorize");
    dispatch({
      type: LOAD_USER,
      payload: data
    });
    successFlag("Welcome to OCA!");
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
    if (err.response) {
      errorFlag(err.response.data);
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
    successFlag("Successfully logged in");
    console.log("login data", data);
  } catch (err) {
    errorFlag(err.response.data);
    console.log(err);
    // console.error("login error: ", err.response.data);
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const logOut = () => ({
  type: LOGOUT
});

export const getCallLog = () => async dispatch => {
  try {
    const { data } = await user.get("/call/GetCallLog");
    dispatch({
      type: GET_CALL_LOG,
      payload: data
    });
    console.log("call log", data);
  } catch (err) {
    console.error(err);
  }
};
