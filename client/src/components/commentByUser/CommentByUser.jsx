import { Card, Divider, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Chat from "@material-ui/icons/Chat";
import { fetchTweets, removeTweetById } from "../../Redux/Actions/tweetActions";
import EditForm from "../editForm/EditForm";
import CommentForm from "../commentForm/CommentForm";
import UserCommands from "../userCommands/UserCommands";
import { styled } from "@mui/material/styles";

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

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
            <Div style={{ borderRight: "0.1em solid gray", padding: "0.2em" }}>
              {comment?.postId?.tweeterId?.username}
            </Div>
            <Div style={{ borderRight: "0.1em solid gray", padding: "0.2em" }}>
              {comment?.postId?.publishedAt?.slice(0, 10)}
            </Div>
          </div>
          <Divider />
          <Div>{comment?.dateOfComment.slice(0, 10)}</Div>
          <Div>Comment: {comment?.comment}</Div>

          <Card className="cardContainer">
            <Div> {comment?.postId?.content}</Div>
            <img
              className="img"
              src={comment?.postId?.image}
              alt="tweetImage"
            />
          </Card>
          <Divider />
        </Paper>
      ) : (
        ""
      )}
    </>
  );
};

export default CommentByUser;
