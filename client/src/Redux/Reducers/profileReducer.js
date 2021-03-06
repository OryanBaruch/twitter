import {
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  EDIT_PROFILE_REQUESTS,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILURE,
} from "../Actions/actionTypes";

export const profileReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_PROFILE_REQUEST:
      return {
        loading: true,
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        loading: false,
        error: payload.error,
        msg: payload.msg,
        profile: payload.profile,
      };
    case FETCH_PROFILE_FAILURE:
      return {
        error: true,
        msg: "Error with fetch profile data",
      };
    default:
      return state;
  }
};

export const followReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case FOLLOW_USER_REQUEST:
      return {
        loading: true,
      };
    case FOLLOW_USER_SUCCESS:
      return {
        ...state,
        msg: payload.msg,
        profile: payload.toggleFollow,
        // followers:payload.toggleFollow.followers
      };
    case FOLLOW_USER_FAILURE:
      return {
        error: payload.error,
        msg: payload.msg,
      };
    default:
      return state;
  }
};

export const editProfileReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case EDIT_PROFILE_REQUESTS:
      return {
        loading: true,
        error: null,
        msg: "Editing...",
      };
    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: payload.error,
        msg: payload.msg,
        profile: payload,
      };
    case EDIT_PROFILE_FAILURE:
      return {
        loading: false,
        error: payload.error,
        msg: payload.msg,
      };
    default:
      return state;
  }
};
