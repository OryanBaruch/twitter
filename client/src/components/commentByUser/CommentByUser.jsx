import { Card, Divider, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Chat from "@material-ui/icons/Chat";
import { fetchTweets, removeTweetById } from "../../Redux/Actions/tweetActions";
import EditForm from "../editForm/EditForm";
import CommentForm from "../commentForm/CommentForm";
import UserCommands from "../userCommands/UserCommands";

const CommentByUser = ({ comment }) => {
  const [counter, setCounter] = useState(1);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleDelete = async (_id) => {
    dispatch(removeTweetById(_id));
    setCounter((prev) => prev + 1);
  };

  useEffect(() => {
    if (!handleDelete) {
      dispatch(fetchTweets());
    }
  }, [counter, dispatch]);

  return (
    <>
      {comment.postId !== null ? (
        <Paper elevation={3}>
          <div className="imageAndUserName">
            <img
              className="profile_photo"
              src={comment?.postId?.tweeterId?.profile_photo}
              alt="profile_photo"
              />
            <h4 style={{ borderRight: "0.1em solid gray", padding: "0.2em" }}>
              {comment?.postId?.tweeterId?.username}
            </h4>
            <h4 style={{ borderRight: "0.1em solid gray", padding: "0.2em" }}>
              {comment?.postId?.publishedAt?.slice(0, 10)}
            </h4>
          </div>
          <Divider />
          <Card className="cardContainer">
            <h3> {comment?.postId?.content}</h3>
            <img
              className="img"
              src={comment?.postId?.image}
              alt="tweetImage"
              />
          </Card>
          <h3>myComment: {comment?.comment}</h3>
          <h3>{comment?.dateOfComment.slice(0, 10)}</h3>
          <Divider />
          <div className="userCommands">
            <h3>
              <FavoriteBorderIcon className="like" fontSize="medium" />{" "}
              {comment?.postId?.numberOfLikes}
            </h3>
            {comment?.postId?.tweeterId?._id ===
            JSON.parse(localStorage.getItem("user_info")).id ? (
              //fix comment on comment
              <>
                <UserCommands
                  handleDelete={handleDelete}
                  tweet={comment}
                  handleOpenEdit={handleOpenEdit}
                  />
              </>
            ) : (
              ""
              )}
            <Chat className="comment" onClick={handleOpen} />
          </div>
          <CommentForm tweet={comment} open={open} handleClose={handleClose} />
          <EditForm
            open={openEdit}
            tweet={comment}
            handleClose={handleCloseEdit}
            />
        </Paper>
            ) : ( ""
      )}
    </>
  );
};

export default CommentByUser;
