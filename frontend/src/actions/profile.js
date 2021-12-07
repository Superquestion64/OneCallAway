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
    alert(res.data);
  } catch (err) {
    console.log(err);
    alert("Cannot update profile");
  }
};

export const updateInterests = formData => async dispatch => {
  try {
    const res = await user.patch("/add_interest", formData);

    dispatch({
      type: UPDATE_INTERESTS,
      payload: res.data
    });
    alert(res.data);
  } catch (err) {
    console.log(err);
    alert("Cannot update interests");
  }
};
