import user from "../api/user";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from "../types";

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
    alert(err.response.data.error);

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const logOut = () => ({
  type: LOGOUT
});
