import { Card, Divider, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Chat from "@material-ui/icons/Chat";
import EditForm from "../editForm/EditForm";
import CommentForm from "../commentForm/CommentForm";
import "./tweetItem.css";
import UserCommands from "../userCommands/UserCommands";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { localStorageData } from "../../Redux/Actions/actionTypes";
import {
  fetchTweets,
  fetchTweetsByUserId,
  removeTweetById,
  toggleLikeTweet,
} from "../../Redux/Actions/tweetActions";
import { styled } from "@mui/material/styles";
import BookmarkBorder from "@material-ui/icons/BookmarkBorder";
import {
  fetchLoggedInUserData,
  toggleSavePosts,
} from "../../Redux/Actions/userActions";
import SnackbarAlert from "../snackbar/SnackbarAlert";

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const TweetItem = ({ tweet }) => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [boolean, setBoolean] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const dateFormat = tweet?.publishedAt.slice(0, 10);

  const toggleOpen = () => {
    setBoolean(!boolean);
  };

  const handleToggleOpenEdit = () => {
    setOpenEdit(!openEdit);
  };
  const redirectProfile = () => {
    localStorage.setItem("userId", tweet?.tweeterId?._id);
    localStorage.removeItem("search");
    history.push(`/profile-by-id/${localStorage.getItem("userId")}`);
  };

  const handleDelete = () => {
    dispatch(removeTweetById(tweet?._id));
    setOpen(true);
    setOpen2(true);
  };

  const handleLikeToggle = () => {
    setOpen(true);
    dispatch(
      toggleLikeTweet({
        _id: tweet?._id,
        tweeterId: localStorageData.id,
      })
    );
  };

  const handleSavePostsToggle = () => {
    dispatch(
      toggleSavePosts({ _id: localStorageData?.id, postId: tweet?._id })
    );
    setOpen2(true);
  };

  useEffect(() => {
    if (open) {
      dispatch(fetchTweetsByUserId(tweet.tweeterId._id));
    } else if (open2) {
      dispatch(fetchTweets());
    }
    setOpen(false);
    setOpen2(false);
  }, [dispatch, open, open2, tweet.tweeterId._id]);

  return (
    <>
      <Paper elevation={3}>
        <div className="imageAndUserName">
          <BookmarkBorder
            className="bookMarksIcon"
            onClick={handleSavePostsToggle}
          />
          <img
            onClick={redirectProfile}
            className={
              localStorageData.id === tweet?.tweeterId._id
                ? "profile_photo"
                : "not_user_profile_photo"
            }
            src={
              tweet?.tweeterId?.profile_photo
                ? tweet?.tweeterId?.profile_photo
                : ""
            }
            alt="profile_photo"
          />
          <Div style={{ borderRight: "0.1em solid gray", padding: "0.2em" }}>
            {tweet?.tweeterId?.username}
          </Div>
          <Div style={{ borderRight: "0.1em solid gray", padding: "0.2em" }}>
            {dateFormat}
          </Div>
        </div>
        <Divider />
        <Card className="cardContainer">
          <Div> {tweet.content}</Div>
          <h6>{tweet._id}</h6>
          <img
            onDoubleClick={handleLikeToggle}
            className="img"
            src={tweet.image}
            alt=""
          />
        </Card>
        <Divider />
        <div className="userCommands">
          <h3>
            <FavoriteIcon
              onClick={handleLikeToggle}
              className={
                tweet?.likes?.includes(localStorageData.id)
                  ? "likedTweet"
                  : "like"
              }
              fontSize="medium"
              color="red"
            />{" "}
            {tweet?.likes?.length}
          </h3>

          <Chat className="comment" onClick={toggleOpen} />
          {JSON.parse(localStorage.getItem("user_info")).id ===
          tweet?.tweeterId?._id ? (
            <>
              <UserCommands
                handleDelete={handleDelete}
                tweet={tweet}
                handleOpenEdit={handleToggleOpenEdit}
              />
            </>
          ) : (
            ""
          )}
        </div>
        <CommentForm tweet={tweet} open={boolean} handleClose={toggleOpen} />
        <EditForm
          open={openEdit}
          tweet={tweet}
          handleClose={handleToggleOpenEdit}
        />
      </Paper>
    </>
  );
};

export default TweetItem;
