import {
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  EDIT_PROFILE_REQUESTS,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILURE,
  ENDPOINT,
} from "./actionTypes";

export const fetchProfileById = (_id) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_PROFILE_REQUEST,
    });
    const fetchFromSearch = localStorage.getItem("search");
    const fetchFromUserId = localStorage.getItem("userId");
    const res = await fetch(
      ENDPOINT +
        `/profile/profile/${
          fetchFromSearch ? fetchFromSearch : fetchFromUserId
        }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("access_token")),
        },
      }
    );
    const data = await res.json();
    dispatch({
      type: FETCH_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PROFILE_FAILURE,
      payload: error.message,
    });
  }
};

export const editProfile =
  ({ _id, username, email, profile_photo }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: EDIT_PROFILE_REQUESTS,
      });
      const res = await fetch(ENDPOINT + `/profile/edit-profile/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("access_token")),
        },
        body: JSON.stringify({
          username,
          email,
          profile_photo,
        }),
      });
      const data = await res.json();
      dispatch({
        type: EDIT_PROFILE_SUCCESS,
        payload: data.editProfile,
      });
    } catch (error) {
      dispatch({
        type: EDIT_PROFILE_FAILURE,
        payload: error.message,
      });
    }
  };
