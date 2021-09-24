import {
  ENDPOINT,
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAILURE,
  FETCH_COMMENT_BY_USER_REQUEST,
  FETCH_COMMENT_BY_USER_SUCCESS,
  FETCH_COMMENT_BY_USER_FAILURE,
} from "./actionTypes";

export const commentAction = (comment, postId) => async (dispatch) => {
  try {
    dispatch({
      type: POST_COMMENT_REQUEST,
    });
    const tweeterId = JSON.parse(localStorage.getItem("user_info")).id;
    console.log("id is ", tweeterId);
    const res = await fetch(ENDPOINT + `/comment/post-comment/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment,
        tweeterId,
      }),
    });
    const data = await res.json();
    // console.log(data);
    dispatch({
      type: POST_COMMENT_SUCCESS,
      payload: data.fetchComments,
    });
  } catch (error) {
    console.log({ error });
    dispatch({
      POST_COMMENT_FAILURE,
      payload: error,
    });
  }
};

export const fetchCommentsById = (_id) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_COMMENT_BY_USER_REQUEST,
    });
    // const tweeterId = JSON.parse(localStorage.getItem("user_info")).id;
    const res = await fetch(
      ENDPOINT + `/comment/fetch-post-by-user-comments/${_id}`
    );
    const data = await res.json();
    // console.log(data.fetchCommentsById);
    dispatch({
      type: FETCH_COMMENT_BY_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log({ error });
    dispatch({
      type: FETCH_COMMENT_BY_USER_FAILURE,
      payload: error,
    });
  }
};
