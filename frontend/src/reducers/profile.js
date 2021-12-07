import {
  GET_PROFILE,
  UPDATE_PROFILE,
  UPDATE_INTERESTS
} from "../actions/types";

const initialState = {
  profile: {},
  interests: []
};

const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload
      };
    case UPDATE_INTERESTS:
      return {
        ...state,
        interests: payload
      };
    default:
      return state;
  }
};

export default profileReducer;
