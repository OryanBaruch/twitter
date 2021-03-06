import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  loginReducer,
  registerReducer,
  fetchUserDataReducer,
  fetchAllUsersReducer,
} from "./Reducers/userReducer";
import {
  postTweetReducer,
  fetchTweetsReducer,
  fetchTweetsByIdReducer,
  editTweetsReducer,
  removeTweetReducer,
  likeTweetReducer,
} from "./Reducers/tweetReducer";
import {
  // commentReducer,
  fetchPostByCommentReducer,
} from "./Reducers/commentReducer";
import {
  profileReducer,
  followReducer,
  editProfileReducer,
} from "./Reducers/profileReducer";
import thunk from "redux-thunk";

const combine_reducers = combineReducers({
  loginReducer,
  registerReducer,
  fetchTweetsReducer,
  postTweetReducer,
  fetchUserDataReducer,
  fetchTweetsByIdReducer,
  // commentReducer,
  fetchPostByCommentReducer,
  editTweetsReducer,
  removeTweetReducer,
  likeTweetReducer,
  profileReducer,
  followReducer,
  fetchAllUsersReducer,
  editProfileReducer,
});

const middleware = [thunk];
const store = createStore(
  combine_reducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
