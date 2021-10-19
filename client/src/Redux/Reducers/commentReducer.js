import {
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAILURE,
  FETCH_COMMENT_BY_USER_REQUEST,
  FETCH_COMMENT_BY_USER_SUCCESS,
  FETCH_COMMENT_BY_USER_FAILURE,
  REMOVE_COMMENT_REQUEST,
  REMOVE_COMMENT_SUCCESS,
  REMOVE_COMMENT_FAILURE,
} from "../Actions/actionTypes";

const commentsInitalState = {
  loading: false,
  error: null,
  isCommentRendered: false,
  commentByUser:[],
  msg: "",
};

export const fetchPostByCommentReducer = (
  state = commentsInitalState,
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_COMMENT_BY_USER_REQUEST:
      return {
        loading: true,
      };
    case FETCH_COMMENT_BY_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        commentByUser: payload.fetchCommentsById,
        isCommentRendered: false,
        msg: payload.msg,
      };
    case FETCH_COMMENT_BY_USER_FAILURE:
      return {
        loading: false,
        error: payload,
      };
      case POST_COMMENT_REQUEST:
        return {
          loading: true,
        };
      case POST_COMMENT_SUCCESS:
        return {
          ...state,
          loading: false,
          comment: payload.commentByUser,
        };
      case POST_COMMENT_FAILURE:
        return {
          loading: false,
          error: payload,
        };
    case REMOVE_COMMENT_REQUEST:
      return {
        loading: true,
      };
    case REMOVE_COMMENT_SUCCESS:
      // let filteredComments=state.commentByUser.filter((comment)=>comment._id!==payload.removeComment._id)
      return {
        ...state,
        loading: false,
        msg: payload.msg,
        commentByUser: payload.fetchCommentsById,
      };
    case REMOVE_COMMENT_FAILURE:
      return{
        loading:false,
        msg:payload.msg,
        error:payload.error
      }  
    default:
      return state;
  }
};
