import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOG_OUT
} from "../types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOG_OUT:
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default userReducer;
