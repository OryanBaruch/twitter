import {
  FETCH_TWEETS_FAILURE,
  FETCH_TWEETS_REQUEST,
  FETCH_TWEETS_SUCCESS,
  POST_TWEET_FAILURE,
  POST_TWEET_REQUEST,
  POST_TWEET_SUCCESS,
  REMOVE_TWEET_FAILURE,
  REMOVE_TWEET_REQUEST,
  REMOVE_TWEET_SUCCESS,
  EDIT_TWEET_REQUEST,
  EDIT_TWEET_SUCCESS,
  EDIT_TWEET_FAILURE,
  FETCH_TWEETS_BY_USERID_REQUEST,
  FETCH_TWEETS_BY_USERID_SUCCESS,
  FETCH_TWEETS_BY_USERID_FAILURE,
  TOGGLE_LIKE_TWEET_SUCCESS,
  LIKE_TWEET_FAILURE,
  TOGGLE_SAVE_POST_REQUEST,
  TOGGLE_SAVE_POST_SUCCESS,
  TOGGLE_SAVE_POST_FAILURE,
} from "../Actions/actionTypes";

const InitalState = {
  loading: false,
  error: null,
  msg: "",
  tweets: [],
  likes: [],
  isRendered: false,
};

export const postTweetReducer = (state = InitalState, action) => {
  const { payload, type } = action;
  switch (type) {
    case POST_TWEET_REQUEST:
      return {
        loading: true,
        msg: "Loading tweets...",
      };
    case POST_TWEET_SUCCESS:
      return {
        ...state,
        tweets: payload,
        loading: false,
        msg: payload.msg,
        error: null,
      };
    case POST_TWEET_FAILURE:
      return {
        loading: false,
        error: payload.message,
        tweets: [],
      };

    default:
      return state;
  }
};

export const fetchTweetsReducer = (state = [], action) => {
  const { payload, type } = action;
  switch (type) {
    case FETCH_TWEETS_REQUEST:
      return {
        loading: true,
      };
    case FETCH_TWEETS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        tweets: payload,
        isRendered: false,
      };

    case FETCH_TWEETS_FAILURE:
      return {
        loading: false,
        tweets: [],
        error: payload.message,
      };
    default:
      return state;
  }
};

export const removeTweetReducer = (state = [], action) => {
  const { payload, type } = action;
  switch (type) {
    case REMOVE_TWEET_REQUEST:
      return {
        loading: true,
      };
    case REMOVE_TWEET_SUCCESS:
      return {
        ...state,
        loading: false,
        tweets: payload.filteredTweets,
        fetchTweetsByUser: payload.fetchTweetsByUser,
        msg: payload.msg,
      };
    case REMOVE_TWEET_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.error,
      };
    default:
      return state;
  }
};

export const editTweetsReducer = (state = [], action) => {
  const { payload, type } = action;
  switch (type) {
    case EDIT_TWEET_REQUEST:
      return {
        loading: true,
        msg: "Loading page",
      };
    case EDIT_TWEET_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: payload.msg,
        tweets: payload.fetchAllTweets,
        tweetsByUserId: payload.fetchTweetsByUser,
      };
    case EDIT_TWEET_FAILURE:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const fetchTweetsByIdReducer = (state = InitalState, action) => {
  const { payload, type } = action;
  switch (type) {
    case FETCH_TWEETS_BY_USERID_REQUEST:
      return {
        loading: true,
        msg: "Loading Tweets for user...",
      };
    case FETCH_TWEETS_BY_USERID_SUCCESS:
      return {
        ...state,
        tweets: payload.fetchTweetsByUser,
        numberOfTweets: payload.numberOfTweets,
        msg: payload.msg,
        error: payload.error,
        loading: false,
        isRendered: false,
      };
    case FETCH_TWEETS_BY_USERID_FAILURE:
      return {
        loading: false,
        error: payload.message,
        tweets: [],
      };

    default:
      return state;
  }
};

export const likeTweetReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case TOGGLE_LIKE_TWEET_SUCCESS:
      return {
        ...state,
        tweetData: payload,
        likes: payload.toggleLikeTweet.likes,
        msg: payload.msg,
      };
    case LIKE_TWEET_FAILURE:
      return {
        ...state,
        likes: [],
        msg: payload.error,
      };

    default:
      return state;
  }
};

export const saveTweetReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case TOGGLE_SAVE_POST_REQUEST:
      return {
      lodaing:true
      }
    case TOGGLE_SAVE_POST_SUCCESS:
      return {
        ...state,
        tweetData: payload,
        likes: payload.toggleLikeTweet.likes,
        msg: payload.msg,
      };
    case LIKE_TWEET_FAILURE:
      return {
        ...state,
        likes: [],
        msg: payload.error,
      };

    default:
      return state;
  }
};
