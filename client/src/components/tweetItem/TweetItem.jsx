import { Card, Divider, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Chat from "@material-ui/icons/Chat";
import EditForm from "../editForm/EditForm";
import CommentForm from "../commentForm/CommentForm";
import "./tweetItem.css";
import UserCommands from "../userCommands/UserCommands";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import {
  fetchTweets,
  fetchTweetsByUserId,
  removeTweetById,
  toggleLikeTweet,
} from "../../Redux/Actions/tweetActions";

const TweetItem = ({ tweet }) => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [boolean, setBoolean] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const dispatch = useDispatch();

  const history = useHistory();
  const dateFormat = tweet?.publishedAt.slice(0, 10);
  const localStorageData = JSON.parse(localStorage.getItem("user_info"));
  const userId = localStorage.getItem("userId");

  const handleOpen = () => {
    setBoolean(true);
  };

  const handleClose = () => {
    setBoolean(false);
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const redirectProfile = () => {
    localStorage.setItem("userId", tweet?.tweeterId?._id);
    console.log(tweet?.tweeterId?._id);
    history.push(`/profile-by-id/${tweet?.tweeterId?._id}`);
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

  useEffect(() => {
    if (open) {
      dispatch(fetchTweetsByUserId(localStorageData.id));
    } else if (open2) {
      dispatch(fetchTweets());
    }
    setOpen(false);
    setOpen2(false);
  }, [dispatch, open, open2, localStorageData.id]);

  return (
    <>
      <Paper elevation={3}>
        <div className="imageAndUserName">
          <img
            onClick={redirectProfile}
            className={
              localStorageData.id === tweet?.tweeterId._id
                ? "profile_photo"
                : "not_user_profile_photo"
            }
            src={tweet?.tweeterId?.profile_photo}
            alt="profile_photo"
          />
          <h4 style={{ borderRight: "0.1em solid gray", padding: "0.2em" }}>
            {tweet?.tweeterId?.username}
          </h4>
          <h4 style={{ borderRight: "0.1em solid gray", padding: "0.2em" }}>
            {dateFormat}
          </h4>
        </div>
        <Divider />
        <Card className="cardContainer">
          <h3> {tweet.content}</h3>
          <Divider />
          <img
            onDoubleClick={handleLikeToggle}
            className="img"
            src={tweet.image}
            alt="tweetImage"
          />
        </Card>
        {/* <h6>tweetID: {tweet?._id}</h6> */}
        <h6>userId: {tweet?.tweeterId?._id}</h6>
        <Divider />
        <div className="userCommands">
          <h3>
            <FavoriteBorderIcon
              onClick={handleLikeToggle}
              className={
                tweet?.likes?.includes(localStorageData.id)
                  ? "likedTweet"
                  : "like"
              }
              fontSize="medium"
            />{" "}
            {tweet?.likes?.length}
          </h3>
          <Chat className="comment" onClick={handleOpen} />
          {JSON.parse(localStorage.getItem("user_info")).id ===
          tweet?.tweeterId?._id ? (
            <>
              <UserCommands
                handleDelete={handleDelete}
                tweet={tweet}
                handleOpenEdit={handleOpenEdit}
              />
            </>
          ) : (
            ""
          )}
        </div>
        <CommentForm tweet={tweet} open={boolean} handleClose={handleClose} />
        <EditForm open={openEdit} tweet={tweet} handleClose={handleCloseEdit} />
      </Paper>
    </>
  );
};

export default TweetItem;
