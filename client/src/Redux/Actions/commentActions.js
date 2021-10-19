import {
  ENDPOINT,
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAILURE,
  FETCH_COMMENT_BY_USER_REQUEST,
  FETCH_COMMENT_BY_USER_SUCCESS,
  FETCH_COMMENT_BY_USER_FAILURE,
  REMOVE_COMMENT_REQUEST,
  REMOVE_COMMENT_SUCCESS,
  REMOVE_COMMENT_FAILURE,
} from "./actionTypes";

export const commentAction = (comment, postId) => async (dispatch) => {
  try {
    dispatch({
      type: POST_COMMENT_REQUEST,
    });
    const tweeterId = JSON.parse(localStorage.getItem("user_info")).id;
    const res = await fetch(ENDPOINT + `/comment/post-comment/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.parse(localStorage.getItem("access_token")),
      },
      body: JSON.stringify({
        comment,
        tweeterId,
      }),
    });
    const data = await res.json();
    dispatch({
      type: POST_COMMENT_SUCCESS,
      payload: data.fetchComments,
    });
  } catch (error) {
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
    const res = await fetch(
      ENDPOINT + `/comment/fetch-post-by-user-comments/${_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("access_token")),
        },
      }
    );
    const data = await res.json();
    dispatch({
      type: FETCH_COMMENT_BY_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_COMMENT_BY_USER_FAILURE,
      payload: error,
    });
  }
};

export const removeCommentById =
  ({ _id, tweeterId }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: REMOVE_COMMENT_REQUEST,
      });
      const res = await fetch(ENDPOINT + `/comment/remove-comment/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("access_token")),
        },
        body: JSON.stringify({
          tweeterId,
        }),
      });
      const data = await res.json();
      dispatch({
        type: REMOVE_COMMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: REMOVE_COMMENT_FAILURE,
        payload: error,
      });
    }
  };
