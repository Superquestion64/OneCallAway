import { GET_PROFILE, UPDATE_PROFILE } from "../actions/types";

const initialState = {
  profile: null
};

const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    default:
      return state;
  }
};

export default profileReducer;
