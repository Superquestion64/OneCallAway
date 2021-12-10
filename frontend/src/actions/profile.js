import user from "../api/user";
import {
  GET_PROFILE,
  UPDATE_PROFILE,
  UPDATE_INTERESTS,
  GET_INTERESTS
} from "./types";
import { successFlag, errorFlag } from "../notification";

export const getProfile = () => async dispatch => {
  try {
    const res = await user.get("/profile");
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    console.log("error getting profile", err);
  }
};

//update profile
export const updateProfile = formData => async dispatch => {
  try {
    const res = await user.patch("/profile/update_profile", formData);
    successFlag("profile updated successfully");
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    console.log(res.data);
  } catch (err) {
    console.error(err);
    // errorFlag(err.response.data)
    console.log("Cannot update profile");
  }
};

export const getInterests = () => async dispatch => {
  try {
    const res = await user.get("/get_interest");
    dispatch({
      type: GET_INTERESTS,
      payload: res.data.tags
    });
  } catch (err) {
    console.log("error getting profile", err);
  }
};

export const updateInterests = formData => async dispatch => {
  try {
    const res = await user.patch("/add_interest", formData);

    dispatch({
      type: UPDATE_INTERESTS,
      payload: res.data.tags
    });
    successFlag(res.data);
  } catch (err) {
    errorFlag(err.response.data);
  }
};
