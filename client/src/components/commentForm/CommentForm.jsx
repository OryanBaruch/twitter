import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useDispatch } from "react-redux";
import { Button, Divider, TextField, Paper } from "@material-ui/core";
import { commentAction } from "../../Redux/Actions/commentActions";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "30vw",
    height: "30vh",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const CommentForm = ({ tweet, open, handleClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const _id = tweet && tweet._id;

  const handleComment = () => {
    dispatch(commentAction(comment, _id));
    handleClose()
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Paper id="formPaper" className={classes.paper} elevation={3}>
          <div>
            <div>
              <TextField
                type="text"
                name="content"
                placeholder="Place comment?..."
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              />
              <br />
              <br />
              <Divider />
            </div>
            <div className="btn-div">
              <Button
                id="btn-holder"
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={handleComment}
              >
                Reply
              </Button>
            </div>
          </div>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default CommentForm;
