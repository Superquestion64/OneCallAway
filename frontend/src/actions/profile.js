import user from "../api/user";
import { UPDATE_PROFILE, UPDATE_INTERESTS } from "./types";
//update profile
export const updateProfile = formData => async dispatch => {
  try {
    const res = await user.patch("/update_profile", formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    alert("profile updated successfully");
  } catch (err) {
    console.log(err);
    alert("Cannot update profile");
  }
};

export const updateInterests = formData => async dispatch => {
  try {
    const res = await user.patch("/interests", formData);

    dispatch({
      type: UPDATE_INTERESTS,
      payload: res.data
    });
    alert("interests update successful");
  } catch (err) {
    console.log(err);
    alert("Cannot update interests");
  }
};
