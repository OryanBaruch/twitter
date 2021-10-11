/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Paper } from "@material-ui/core";
import { fetchProfileById } from "../../Redux/Actions/profileAction";
import { useParams, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTweetsByUserId } from "../../Redux/Actions/tweetActions";
import DateRange from "@material-ui/icons/DateRange";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/core/styles";
import "./profile.css";
import SnackbarAlert from "../snackbar/SnackbarAlert";
import TweetItem from "../tweetItem/TweetItem";
import { toggleFollow } from "../../Redux/Actions/followActions";
import { styled } from "@mui/material/styles";

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
}));

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
  button: {
    color: "blue",
  },
}));

const ProfileById = () => {
  const classes = useStyles();
  const [follow, setFollow] = useState(false);
  const [tweetsRendered, setTweetsRendered] = useState(false);
  const localStorageData = JSON.parse(localStorage.getItem("user_info"));
  const userId = localStorage.getItem("userId");
  const search = localStorage.getItem("search");
  const dispatch = useDispatch();
  const history = useHistory();

  const profileReducer = useSelector((state) => state.profileReducer);
  const { profile } = profileReducer;

  const followReducer = useSelector((state) => state.followReducer);
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
        _id: userId ? userId : search,
        followerId: localStorageData.id,
      })
    );
    setFollow(!follow);
  };

  useEffect(() => {
    dispatch(fetchTweetsByUserId(search ? search : userId));
    dispatch(fetchProfileById(search ? search : userId));
  }, [dispatch, localStorageData.id, localStorage.getItem("search")]);

  return (
    <>
      {tweetsRendered ? <SnackbarAlert error={error} msg={msg} /> : ""}
      <Paper id="paperCont" className={classes.noColorPaper}>
        <div>
          <ArrowBack className="arrowback" onClick={redirectHome} />
        </div>
        <div className="userDetails">
          <div>
            <Div> {profile?.username}</Div>
            <Div>
              Followers:{" "}
              {!profile?.followers?.length
                ? "Be the first to follow"
                : profile?.followers?.length}
            </Div>
            {!numberOfTweets ? (
              <Div>You havnt tweeted yet.</Div>
            ) : (
              <Div> Tweeted {numberOfTweets} times.</Div>
            )}
            {follow ? <SnackbarAlert msg={followReducer?.msg} /> : '' }

            {profile?._id === localStorageData.id ? (
              ""
            ) : (
              <Button onClick={handleToggleFollow} className={classes.button}>
                {profile?.followers?.includes(localStorageData.id)
                  ? "UnFollow"
                  : "Follow"}
              </Button>
            )}
          </div>
          <div>
            <img className="image" src={profile?.profile_photo} alt="profile" />
          </div>
        </div>
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
