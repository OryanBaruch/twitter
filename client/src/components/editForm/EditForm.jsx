import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useDispatch } from "react-redux";
import { editTweetAction, fetchTweets, fetchTweetsByUserId } from "../../Redux/Actions/tweetActions";
import { Button, Divider, TextField, Paper } from "@material-ui/core";
import './editForm.css'

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

const EditForm = ({ tweet, open, handleClose , handleOpenEdit }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [content, setcontent] = useState(!tweet ? " " : tweet.content);
  const [image, setImage] = useState(!tweet ? " " : tweet.image);
  const [counter, setCounter] = useState(0)
  const _id = tweet && tweet._id;

  const handleEdit = () => {
    dispatch(editTweetAction({ _id, content, image }));
    setCounter(prev=>prev+1)
    handleClose()
  };
  
  const localStorageData = JSON.parse(localStorage.getItem("user_info"));

  useEffect(() => {
    if (counter) { 
      dispatch(fetchTweets())
      dispatch(fetchTweetsByUserId(localStorageData.id));
    }
  }, [counter, dispatch, localStorageData.id])
  
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
                placeholder="What's happening?..."
                onChange={(e) => setcontent(e.target.value)}
                value={content ? content : ''}
              />
              <br />
              <TextField
                type="text"
                name="image"
                placeholder="Insert Image..."
                value={image ? image : ''}
                onChange={(e) => setImage(e.target.value)}
              />
              <br />
              <Divider />
            </div>
            <div className="btn-div">
              <Button
                id="btn-holder"
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={handleEdit}
              >
                Edit
              </Button>
            </div>
          </div>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default EditForm;
