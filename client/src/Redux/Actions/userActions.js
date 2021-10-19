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
  FETCH_ALL_USERS_SUCCESS,
  FETCH_ALL_USERS_FAILURE,
  TOGGLE_SAVE_POST_REQUEST,
  TOGGLE_SAVE_POST_SUCCESS,
  TOGGLE_SAVE_POST_FAILURE,
  FETCH_USER_DATA_FAILURE,
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
      console.log(data.msg);
      if (res.status >= 400) {
        dispatch({
          type: LOGIN_FAILURE,
          payload: data,
        });
      } else {
        console.log(data.error);
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
    const res = await fetch(ENDPOINT + `/auth/user-data/${_id}`, {
      headers: {
        Authorization: JSON.parse(localStorage.getItem("access_token")),
      },
    });
    const data = await res.json();
    dispatch({
      type: FETCH_USER_DATA_SUCCESS,
      payload: data.userData[0],
    });
  } catch (error) {
    dispatch({
      type: FETCH_USER_DATA_FAILURE,
      payload: error,
    });
  }
};

export const fetchAllUsers = () => async (dispatch) => {
  try {
    const res = await fetch(ENDPOINT + `/auth/all-users`, {
      headers: {
        Authorization: JSON.parse(localStorage.getItem("access_token")),
      },
    });
    const data = await res.json();
    dispatch({
      type: FETCH_ALL_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ALL_USERS_FAILURE,
      payload: error,
    });
  }
};

export const toggleSavePosts = ({_id, postId}) => async (dispatch) => {
  try {
    dispatch({
      type: TOGGLE_SAVE_POST_REQUEST,
    });
    const res = await fetch(ENDPOINT + `/tweet/toggle-save-posts/${_id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.parse(localStorage.getItem("access_token"))
      },
      body: JSON.stringify({
        postId,
      }),
    });
    console.log(res)
    const data = await res.json();
    console.log(data)
    dispatch({
      type: TOGGLE_SAVE_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: TOGGLE_SAVE_POST_FAILURE,
      payload: error,
    });
  }
};
