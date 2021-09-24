import {
  ENDPOINT,
  FETCH_TWEETS_FAILURE,
  POST_TWEET_FAILURE,
  POST_TWEET_REQUEST,
  POST_TWEET_SUCCESS,
  FETCH_TWEETS_REQUEST,
  FETCH_TWEETS_SUCCESS,
  REMOVE_TWEET_REQUEST,
  REMOVE_TWEET_SUCCESS,
  REMOVE_TWEET_FAILURE,
  EDIT_TWEET_REQUEST,
  EDIT_TWEET_SUCCESS,
  FETCH_TWEETS_BY_USERID_REQUEST,
  FETCH_TWEETS_BY_USERID_SUCCESS,
  FETCH_TWEETS_BY_USERID_FAILURE,
} from "./actionTypes";

export const postTweet = (content, image) => async (dispatch) => {
  try {
    dispatch({
      type: POST_TWEET_REQUEST,
    });
    const tweeterId = JSON.parse(localStorage.getItem("user_info")).id;
    console.log("id is ", tweeterId);
    const res = await fetch(ENDPOINT + `/tweet/post-tweet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        image,
        tweeterId,
      }),
    });
    const data = await res.json();
    console.log(data);
    dispatch({
      type: POST_TWEET_SUCCESS,
      payload: data.postNewTweet,
    });
  } catch (error) {
    console.log(`The error is ` + error);
    dispatch({
      type: POST_TWEET_FAILURE,
      payload: error,
    });
  }
};

export const fetchTweets = () => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_TWEETS_REQUEST,
    });
    const res = await fetch(ENDPOINT + "/tweet/tweets");
    const data = await res.json();
    dispatch({
      type: FETCH_TWEETS_SUCCESS,
      payload: data.fetchAllTweets,
    });
  } catch (error) {
    dispatch({
      type: FETCH_TWEETS_FAILURE,
      payload: error,
    });
  }
};

export const removeTweetById = (_id) => async (dispatch) => {
  try {
    dispatch({
      type: REMOVE_TWEET_REQUEST,
    });
    const res = await fetch(ENDPOINT + `/tweet/remove-tweet/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    console.log(data.fetchTweetsByUser);
    dispatch({
      type: REMOVE_TWEET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: REMOVE_TWEET_FAILURE,
      payload: error,
    });
  }
};

export const editTweetAction =
  ({ _id, content, image }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: EDIT_TWEET_REQUEST,
      });
      const res = await fetch(ENDPOINT + `/tweet/edit-tweet/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          image,
        }),
      });
      const data = await res.json();
      console.log(data);
      console.log(data.fetchTweetsByUser);
      dispatch({
        type: EDIT_TWEET_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: EDIT_TWEET_SUCCESS,
        payload: error.message,
      });
    }
  };

  export const fetchTweetsByUserId=(_id)=>async (dispatch)=>{
    try {
      dispatch({
        type:FETCH_TWEETS_BY_USERID_REQUEST,
      })
      const res=await fetch(ENDPOINT+`/tweet/tweets-by-user-id/${_id}`)
      const data=await res.json()
      console.log(data)
      console.log(data.fetchTweetsByUser)
      dispatch({
        type:FETCH_TWEETS_BY_USERID_SUCCESS,
        payload:data
      })
    } catch (error) {
      console.log({error})
      dispatch({
        type:FETCH_TWEETS_BY_USERID_FAILURE,
        payload:error
      })
    }
  }