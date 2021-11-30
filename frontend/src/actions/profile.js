import user from "../api/user";
import { UPDATE_PROFILE } from "./types";
//update profile
export const updateProfile = formData => async dispatch => {
  try {
    const res = await user.patch("/update_profile", formData);
    alert("profile update successful");
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
