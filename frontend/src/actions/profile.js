import user from "../api/user";
import { GET_PROFILE, UPDATE_PROFILE, UPDATE_INTERESTS } from "./types";
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
    console.error(err);
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
    console.log(err);
    // errorFlag(err.response.data)
    console.log("Cannot update profile");
  }
};

export const updateInterests = formData => async dispatch => {
  try {
    const res = await user.patch("/profile/add_interest", formData);

    dispatch({
      type: UPDATE_INTERESTS,
      payload: res.data
    });
    successFlag(res.data);
  } catch (err) {
    errorFlag(err.response.data);
  }
};
