import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  loginReducer,
  registerReducer,
  fetchUserDataReducer,
} from "./Reducers/userReducer";
import {
  postTweetReducer,
  fetchTweetsReducer,
  fetchTweetsByIdReducer,
  editTweetsReducer,
  removeTweetReducer
} from "./Reducers/tweetReducer";
import {
  commentReducer,
  fetchPostByCommentReducer,
} from "./Reducers/commentReducer";
import thunk from "redux-thunk";

const combine_reducers = combineReducers({
  loginReducer,
  registerReducer,
  fetchTweetsReducer,
  postTweetReducer,
  fetchUserDataReducer,
  fetchTweetsByIdReducer,
  commentReducer,
  fetchPostByCommentReducer,
  editTweetsReducer,
  removeTweetReducer
});

const middleware = [thunk];
const store = createStore(
  combine_reducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;