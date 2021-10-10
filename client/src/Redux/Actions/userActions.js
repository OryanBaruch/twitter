import {
  ENDPOINT,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  USER_LOUGOUT_FAILURE,
  USER_LOUGOUT_SUCCESS,
  FETCH_USER_DATA_REQUEST,
  FETCH_USER_DATA_SUCCESS,
  REGISTER_FAILURE,
} from "./actionTypes";
import jwt_decode from "jwt-decode";

export const loginAction =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: LOGIN_REQUEST,
      });
      const res = await fetch(ENDPOINT + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      console.log(data.msg)
      if (res.status >= 400) {
        dispatch({
          type: LOGIN_FAILURE,
          payload: data,
        });
      } else {
        console.log(data.error)
        localStorage.setItem(
          "user_info",
          JSON.stringify(jwt_decode(data.access_token))
        );
        localStorage.setItem("access_token", JSON.stringify(data.access_token));
        dispatch({
          type: LOGIN_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: error.message,
      });
    }
  };



export const registerAction =
  (username, password, email, birthday, profile_photo) => async (dispatch) => {
    try {
      dispatch({
        type: REGISTER_REQUEST,
      });
      const res = await fetch(ENDPOINT + "/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          email,
          birthday,
          profile_photo,
        }),
      });
      const data = await res.json();
      console.log(data);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: data.registerNewUser,
      });
    } catch (error) {
      dispatch({
        type: REGISTER_FAILURE,
        payload: error,
      });
      console.log(error);
    }
  };

export const userLogoutAction = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOUGOUT_SUCCESS,
    });
    localStorage.clear();
  } catch (error) {
    dispatch({
      type: USER_LOUGOUT_FAILURE,
      payload: error.message,
    });
  }
};

export const fetchLoggedInUserData = (_id) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_USER_DATA_REQUEST,
    });
    // const userId = JSON.parse(localStorage.getItem("user_info")).id;
    const res = await fetch(ENDPOINT + `/auth/user-data/${_id}`);
    const data = await res.json();
    console.log(data)
    dispatch({
      type: FETCH_USER_DATA_SUCCESS,
      payload: data.userData[0],
    });
  } catch (error) {
    dispatch({
      type: FETCH_USER_DATA_SUCCESS,
      payload: error,
    });
  }
};


