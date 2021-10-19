import { Button, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTweetsByUserId } from "../../Redux/Actions/tweetActions";
import { fetchLoggedInUserData } from "../../Redux/Actions/userActions";
import DateRange from "@material-ui/icons/DateRange";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/core/styles";
import TweetItemByUser from "../TweetByUser/TweetItemByUser";
import CommentByUser from "../commentByUser/CommentByUser";
import { useHistory } from "react-router";
import { fetchCommentsById } from "../../Redux/Actions/commentActions";
import Edit from "@material-ui/icons/Edit";
import "./profile.css";
import SnackbarAlert from "../snackbar/SnackbarAlert";
import { styled } from "@mui/material/styles";
import EditProfileForm from "./EditProfileForm";
import { localStorageData } from "../../Redux/Actions/actionTypes";
import SavePosts from "../savedPostsByUser/SavePosts";

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
  edit: {
    position: "absolute",
    right: "2%",
    cursor: "pointer",
  },
}));

const Profile = () => {
  const classes = useStyles();
  const [tweetsRendered, setTweetsRendered] = useState(false);
  const [commentsRendered, setCommentsRendered] = useState(false);
  const [savedPostsRendered, setSavedPostsRendered] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleToggleEdit = () => {
    setOpenEdit(!openEdit);
  };

  const fetchUserDataReducer = useSelector(
    (state) => state.fetchUserDataReducer
  );
  const { userInfo } = fetchUserDataReducer;
  const userInfoData = userInfo && userInfo;
  let dateOfJoin = userInfoData?.joinedAt?.split("").slice(0, 10).join("");

  const fetchTweetsByIdReducer = useSelector(
    (state) => state.fetchTweetsByIdReducer
  );
  let { numberOfTweets, msg, error, isRendered, tweets } =
    fetchTweetsByIdReducer;

  const fetchPostByCommentReducer = useSelector(
    (state) => state.fetchPostByCommentReducer
  );
  let { commentByUser, isCommentRendered } = fetchPostByCommentReducer;

  // const localStorageData = JSON.parse(localStorage.getItem("user_info"));
  const dispatch = useDispatch();
  const history = useHistory();

  const toggleRender = () => {
    if (isRendered) {
      setTweetsRendered(tweetsRendered);
    } else {
      setCommentsRendered(false);
      setSavedPostsRendered(false);
      setTweetsRendered(!tweetsRendered);
    }
  };

  const toggleRenderComments = () => {
    if (isCommentRendered) {
      setCommentsRendered(commentsRendered);
    } else {
      setTweetsRendered(false);
      setSavedPostsRendered(false);
      setCommentsRendered(!commentsRendered);
    }
  };

  const toggleRenderSavedPosts = () => {
    console.log(userInfoData?.savedPosts);

    if (fetchUserDataReducer?.savedPostsRendered) {
      setSavedPostsRendered(savedPostsRendered);
    } else {
      setSavedPostsRendered(!savedPostsRendered);
      setTweetsRendered(false);
      setCommentsRendered(false);
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
  }, [dispatch]);

  return (
    <>
      {tweetsRendered ? <SnackbarAlert error={error} msg={msg} /> : ""}
      <Paper id="paperCont" className={classes.noColorPaper}>
        <ArrowBack className="arrowback" onClick={redirectHome} />
        <div className="userDetails">
          <div>
            <Div> {userInfoData?.username}</Div>
            <Div> Followers :{userInfoData?.followers?.length}</Div>
            {!numberOfTweets ? (
              <Div>No tweets.</Div>
            ) : (
              <Div>
                {" "}
                Tweeted{" "}
                {numberOfTweets > 1 ? numberOfTweets : "User didnt tweet"}{" "}
                times.
              </Div>
            )}
            <Div>Email:{userInfoData?.email}</Div>
          </div>
          <div>
            <img
              onClick={redirectProfile}
              className="image"
              src={userInfoData?.profile_photo}
              alt="profile"
            />
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
          <Button color="primary" onClick={toggleRenderComments}>
            Comments
          </Button>
          <Button color="primary" onClick={toggleRenderSavedPosts}>
            Saved Tweets
          </Button>
          <Edit className={classes.edit} onClick={handleToggleEdit} />
        </div>
        <div className="postByProfile">
          {commentsRendered ? (
            <SnackbarAlert error={error} msg={fetchPostByCommentReducer?.msg} />
          ) : (
            ""
          )}
          {tweetsRendered ? (
            tweets ? (
              tweets?.map((tweet, index) => (
                <TweetItemByUser tweet={tweet} key={index} />
              ))
            ) : (
              <Div>User did not tweet yet.</Div>
            )
          ) : (
            ""
          )}
        </div>
        <div className="bookmarks">
          {savedPostsRendered ? (
            <SnackbarAlert error={error} msg={"Saved Posts"} />
          ) : (
            ""
          )}
          {savedPostsRendered ? (
            userInfoData?.savedPosts.length ? (
              userInfoData?.savedPosts?.map((tweet, index) => (
                <SavePosts
                  userInfoData={userInfoData}
                  tweet={tweet}
                  key={index}
                />
              ))
            ) : (
              <Div>User did not tweet yet.</Div>
            )
          ) : (
            ""
          )}
        </div>
        <div className="commentsByuser">
          {commentsRendered
            ? commentByUser
              ? commentByUser.map((comment, index) => (
                  <CommentByUser comment={comment} key={index} />
                ))
              : ""
            : ""}
        </div>
        <EditProfileForm
          open={openEdit}
          userInfoData={userInfoData}
          handleClose={handleToggleEdit}
        />
      </Paper>
    </>
  );
};

export default Profile;
