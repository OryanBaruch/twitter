import {
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  ENDPOINT,
} from "./actionTypes";

export const fetchProfileById = (_id) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_PROFILE_REQUEST,
    });
    const res = await fetch(ENDPOINT + `/profile/profile/${_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    dispatch({
      type: FETCH_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FETCH_PROFILE_FAILURE,
      payload: error.message,
    });
  }
};
