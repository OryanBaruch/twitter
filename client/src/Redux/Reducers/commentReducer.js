import {
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAILURE,
  FETCH_COMMENT_BY_USER_REQUEST,
  FETCH_COMMENT_BY_USER_SUCCESS,
  FETCH_COMMENT_BY_USER_FAILURE,
} from "../Actions/actionTypes";

export const commentReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case POST_COMMENT_REQUEST:
      return {
        loading: true,
      };
    case POST_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comment: payload,
      };
    case POST_COMMENT_FAILURE:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

const commentsInitalState={
  loading:false, 
  error:null,
  isCommentRendered:false,
  tweetsByUser:[],
  msg:''
}

export const fetchPostByCommentReducer=(state=commentsInitalState, action)=>{
  const {type, payload}=action;
  switch (type) {
    case FETCH_COMMENT_BY_USER_REQUEST:
      return {
        loading: true,
      };
    case FETCH_COMMENT_BY_USER_SUCCESS:
      return {...state,
        loading: false,
        commentByUser: payload.fetchCommentsById,
        isCommentRendered:false,
        msg:payload.msg,
        tweeterInfo:payload.fetchLatestTweet
      };
     case FETCH_COMMENT_BY_USER_FAILURE:
         return {
             loading:false, 
             error:payload
         } 
    default:
      return state;
  }
}