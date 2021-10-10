import { Button, Paper } from "@material-ui/core";
import { fetchProfileById } from "../../Redux/Actions/profileAction";
import { useParams, useHistory } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTweetsByUserId } from "../../Redux/Actions/tweetActions";
import DateRange from "@material-ui/icons/DateRange";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/core/styles";
import "./profile.css";
import SnackbarAlert from "../snackbar/SnackbarAlert";
import TweetItem from "../tweetItem/TweetItem";
import { toggleFollow } from "../../Redux/Actions/followActions";

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

const ProfileById = () => {
  const classes = useStyles();
  const [follow, setFollow] = useState(false);
  const [tweetsRendered, setTweetsRendered] = useState(false);
  const localStorageData = JSON.parse(localStorage.getItem("user_info"));
  const dispatch = useDispatch();
  const history = useHistory();

  const profileReducer = useSelector((state) => state.profileReducer);
  const { profile } = profileReducer;
  const { userId } = useParams;

  const dateOfJoin = profile?.joinedAt?.split("").slice(0, 10).join("");

  const fetchTweetsByIdReducer = useSelector(
    (state) => state.fetchTweetsByIdReducer
  );
  let { numberOfTweets, msg, error, isRendered, tweets } =
    fetchTweetsByIdReducer;

  const toggleRender = () => {
    if (isRendered) {
      setTweetsRendered(tweetsRendered);
    } else {
      setTweetsRendered(!tweetsRendered);
    }
  };

  const redirectHome = () => {
    history.push("/homepage");
  };

  const handleToggleFollow = (_id) => {
    dispatch(
      toggleFollow({
        _id: localStorage.getItem("userId"),
        followerId: localStorageData.id,
      })
    );
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    dispatch(fetchTweetsByUserId(userId));
    dispatch(fetchProfileById(userId));
  }, [dispatch, localStorageData.id, userId]);

  return (
    <>
      {tweetsRendered ? <SnackbarAlert error={error} msg={msg} /> : ""}
      <Paper id="paperCont" className={classes.noColorPaper}>
        <div>
          <ArrowBack className="arrowback" onClick={redirectHome} />
        </div>
        <h3>
          followers:{" "}
          {!profile?.followers.length
            ? "Be the first to follow"
            : profile?.followers.length}
        </h3>
        <div>
          {localStorageData.id === profile?._id ? (
            ""
          ) : (
            <Button onClick={handleToggleFollow}>
              {profile?.followers?.includes(localStorage.getItem("userId"))
                ? "unFollow"
                : "Follow"}
            </Button>
          )}
        </div>
        <div>
          {!numberOfTweets ? (
            <h3>You havnt tweeted yet.</h3>
          ) : (
            <h3> Tweeted {numberOfTweets} times.</h3>
          )}
        </div>
        <img className="image" src={profile?.profile_photo} alt="profile" />
        <h3>{profile?.username }</h3>
        <h3>Email:{profile?.email}</h3>
        <div>
          <DateRange />
          <span>Joined at: {dateOfJoin}</span>
        </div>
        <div className="profileCommands">
          <Button color="primary" onClick={toggleRender}>
            Tweets
          </Button>
        </div>
        <div className="postByProfile">
          {tweetsRendered ? (
            tweets ? (
              tweets?.map((tweet, index) => (
                <TweetItem tweet={tweet} key={index} />
              ))
            ) : (
              <h1>User did not tweet yet.</h1>
            )
          ) : (
            ""
          )}
        </div>
      </Paper>
    </>
  );
};

export default ProfileById;
