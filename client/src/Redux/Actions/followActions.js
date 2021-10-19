import {
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  ENDPOINT,
} from "./actionTypes";
import { fetchProfileById } from "./profileAction";

export const toggleFollow =
  ({ _id, followerId }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: FOLLOW_USER_REQUEST,
      });
      const res = await fetch(
        ENDPOINT + `/follow/toggleFollow/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(localStorage.getItem("access_token"))
          },
          body: JSON.stringify({
            followerId,
          }),
        }
      );
      const data = await res.json();
      console.log(data);
      dispatch({
        type: FOLLOW_USER_SUCCESS,
        payload: data,
    });
    dispatch(fetchProfileById(localStorage.getItem("userId")))
    } catch (error) {
      dispatch({
        type: FOLLOW_USER_FAILURE,
        payload: error,
      });
    }
  };
