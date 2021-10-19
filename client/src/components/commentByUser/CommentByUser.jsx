import { Card, Divider, Paper, Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import { removeCommentById } from "../../Redux/Actions/commentActions";
import { localStorageData } from "../../Redux/Actions/actionTypes";

import Delete from "@material-ui/icons/Delete";
import "./commentByUser.css";
const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const CommentByUser = ({ comment }) => {
  const dispatch = useDispatch();

  const handleRemoveComment = () => {
    console.log(comment._id);
    dispatch(
      removeCommentById({ _id: comment?._id, tweeterId: localStorageData?.id })
    );
  };

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
          <Div>Comment Date: {comment?.dateOfComment.slice(0, 10)}</Div>
          <div className="contentAndButton">
            <Div>Content: {comment?.comment}</Div>
            <Button onClick={handleRemoveComment}><Delete/></Button>
          </div>

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
