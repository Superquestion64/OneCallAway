import axios from "axios";
import { UPDATE_PROFILE } from "./types";
//update profile
export const updateProfile = formData => async dispatch => {
  try {
    const res = await axios.post("/profile", formData);
    alert("profile update successful");
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    alert("profile updated successfully");
  } catch (err) {
    console.log(err.response.data.error);
    alert("Cannot update profile");
  }
};
