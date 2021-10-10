import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  USER_LOUGOUT_SUCCESS,
  LOGIN_FAILURE,
  FETCH_USER_DATA_REQUEST,
  FETCH_USER_DATA_SUCCESS,
  FETCH_USER_DATA_FAILURE,
} from "../Actions/actionTypes";
import jwt_decode from "jwt-decode";

const initalState = {
  loading: false,
  msg: "",
  error: "",
  isAllowed: false,
  userInfo: {},
};

const initalStateUserInfo = {
  loading: false,
  msg: "",
  error: null,
  isAllowed: false,
  userInfo: {},
};

export const loginReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_REQUEST:
      return {
        loading: true,
      };
    case LOGIN_SUCCESS:
      const userInfo = payload.access_token
        ? jwt_decode(payload.access_token)
        : {};
      return {
        loading: false,
        error: null,
        isAllowed: true,
        msg: payload.msg,
        userInfo,
      };
    case LOGIN_FAILURE:
      return {
        loading: false,
        error: payload.error,
        isAllowed: false,
        msg:payload.msg
      };
    case USER_LOUGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
};

export const fetchUserDataReducer = (state = initalStateUserInfo, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_USER_DATA_REQUEST:
      return {
        loading: true,
      };
    case FETCH_USER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: payload.msg,
        userInfo: payload,
        tweets:payload.tweets
      };
    case FETCH_USER_DATA_FAILURE:
      return {
        loading: false,
        error: payload,
        msg: "Error has accuurd (msged by reducer)",
      };

    default:
      return state;
  }
};

export const registerReducer = (state = initalState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_REQUEST:
      return {
        loading: true,
      };
    case REGISTER_SUCCESS:
      return {
        loading: false,
        payload,
        error: "",
      };

    case REGISTER_FAILURE:
      return {
        loading: false,
        payload: null,
        error: payload,
      };
    default:
      return state;
  }
};

// export const registerReducer = (state = {}, action) => {
//   const { type, payload } = action;
//   switch (type) {
//     case REGISTER_SUCCESS:
//       return { ...state, payload };
//     default:
//       return state;
//   }
// };
