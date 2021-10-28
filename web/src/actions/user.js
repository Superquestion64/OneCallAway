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
    alert(err.response.data.error);
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
  } catch (err) {
    alert(err.response.data.error);

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
    // alert(err.response.data.error);
    //let obj = JSON.parse(JSON.stringify(err))
    //console.log({'error': err.response.data.error})
      alert(err.response.data.error)

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const logOut = () => ({
  type: LOGOUT
});
