import user from "../api/user";
import { UPDATE_PROFILE, UPDATE_INTERESTS } from "./types";
import { successFlag, errorFlag } from "../notification";

//update profile
export const updateProfile = formData => async dispatch => {
  try {
    const res = await user.patch("/update_profile", formData);
    successFlag("Profile Updated Successfully");
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
  } catch (err) {
    errorFlag(err.response.data);
  }
};

export const updateInterests = formData => async dispatch => {
  try {
    const res = await user.patch("/add_interest", formData);

    dispatch({
      type: UPDATE_INTERESTS,
      payload: res.data
    });
    successFlag(res.data);
  } catch (err) {
    errorFlag(err.response.data)
  }
};
