import { Button, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTweetsByUserId,
} from "../../Redux/Actions/tweetActions";
import { fetchLoggedInUserData } from "../../Redux/Actions/userActions";
import DateRange from "@material-ui/icons/DateRange";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/core/styles";
import TweetItemByUser from "../TweetByUser/TweetItemByUser";
import CommentByUser from "../commentByUser/CommentByUser";
import { useHistory } from "react-router";
import { fetchCommentsById } from "../../Redux/Actions/commentActions";
import "./profile.css";
import SnackbarAlert from "../snackbar/SnackbarAlert";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "#35525555",
    margin: "auto",
    width: "100%",
  },
  noColorPaper: {
    margin: "auto",
    width: "30%",
  },
}));

const Profile = () => {
  const classes = useStyles();
  const [tweetsRendered, setTweetsRendered] = useState(false);
  const [commentsRendered, setCommentsRendered] = useState(false);

  const fetchUserDataReducer = useSelector(
    (state) => state.fetchUserDataReducer
  );
  const { userInfo } = fetchUserDataReducer;
  const userInfoData = userInfo && userInfo;
  let dateOfJoin = userInfoData?.joinedAt?.split("").slice(0, 10).join("");

  const fetchTweetsByIdReducer = useSelector(
    (state) => state.fetchTweetsByIdReducer
  );
  let { numberOfTweets, msg, error, isRendered , tweets } = fetchTweetsByIdReducer;

  const fetchPostByCommentReducer = useSelector(
    (state) => state.fetchPostByCommentReducer
  );
  let { commentByUser, isCommentRendered } = fetchPostByCommentReducer;

  const localStorageData = JSON.parse(localStorage.getItem("user_info"));
  const dispatch = useDispatch();
  const history = useHistory();

  const toggleRender = () => {
    if (isRendered) {
      setTweetsRendered(tweetsRendered);
    } else {
      setCommentsRendered(false)
      setTweetsRendered(!tweetsRendered);
    }
  };
  
  const toggleRenderComments = () => {
    if (isCommentRendered) {
      setCommentsRendered(commentsRendered);
    } else {
      setTweetsRendered(false);
      setCommentsRendered(!commentsRendered);
    }
  };

  const redirectHome = () => {
    history.push("/homepage");
  };

  const redirectProfile = () => {
    history.push("/homepage");
  };
  

  useEffect(() => {
    dispatch(fetchLoggedInUserData(localStorageData.id));
    dispatch(fetchTweetsByUserId(localStorageData.id));
    dispatch(fetchCommentsById(localStorageData.id));
  }, [dispatch, localStorageData.id]);

  return (
    <>
      {tweetsRendered ? <SnackbarAlert error={error} msg={msg} /> : ""}
      <Paper id="paperCont" className={classes.noColorPaper}>
        <div>
          <ArrowBack className="arrowback" onClick={redirectHome} />
        </div>
        {userInfoData?.username}
        <div>
          {!numberOfTweets ? (
            <h3>You havnt tweeted yet.</h3>
          ) : (
            <h3> Tweeted {numberOfTweets} times.</h3>
          )}
        </div>
        <img
          onClick={redirectProfile}
          className="image"
          src={userInfoData?.profile_photo}
          alt="profile"
        />
        <h3>{userInfoData?.username}</h3>
        <h3>Email:{userInfoData?.email}</h3>
        <div>
          <DateRange />
          <span>Joined at: {dateOfJoin}</span>
        </div>
        <div className="profileCommands">
          <Button color="primary" onClick={toggleRender}>
            Tweets
          </Button>
          <Button color="primary" onClick={toggleRenderComments}>
            Comments
          </Button>
        </div>
        <div className="postByProfile">
          {tweetsRendered ? (
            tweets ? (
              tweets?.map((tweet, index) => (
                <TweetItemByUser tweet={tweet} key={index} />
              ))
            ) : (
              <h1>User did not tweet yet.</h1>
            )
          ) : (
            ""
          )}
        </div>
        <div className="commentsByuser">
          {commentsRendered ? (
            commentByUser ? (
              commentByUser.map((comment, index) => (
                <CommentByUser  comment={comment} key={index} />
              ))
            ) : (
              <h1>{msg}</h1>
            )
          ) : (
            ""
          )}
        </div>
      </Paper>
    </>
  );
};

export default Profile;
