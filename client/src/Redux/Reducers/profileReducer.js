import {
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
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
        error:true,
        msg:'Error with fetch profile data'
      };
    default:
      return state;
  }
};
