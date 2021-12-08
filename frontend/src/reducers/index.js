import { combineReducers } from "redux";
import userReducer from "./user";
import profileReducer from "./profile";

export default combineReducers({
  user: userReducer,
  profile: profileReducer
});
