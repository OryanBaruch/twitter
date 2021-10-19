import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useDispatch, useSelector } from "react-redux";
import { localStorageData } from "../../Redux/Actions/actionTypes";
import {
  Button,
  Divider,
  TextField,
  Paper,
  InputBase,
} from "@material-ui/core";
import { editProfile } from "../../Redux/Actions/profileAction";
import { fetchLoggedInUserData } from "../../Redux/Actions/userActions";
import { useHistory } from "react-router";
import { fetchTweetsByUserId } from "../../Redux/Actions/tweetActions";
import { fetchCommentsById } from "../../Redux/Actions/commentActions";

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

const EditProfileForm = ({ userInfoData, open, handleClose }) => {
  const classes = useStyles();
  const history = useHistory();
  const [counter, setCounter] = useState(0);
  const [email, setEmail] = useState(
    userInfoData && userInfoData?.email
      ? userInfoData && userInfoData?.email
      : localStorageData?.email
  );
  const [profile_photo, setProfile_photo] = useState(
    userInfoData && userInfoData?.profile_photo
      ? userInfoData && userInfoData?.profile_photo
      : localStorageData?.profile_photo
  );
  const [username, setUsername] = useState(
    userInfoData && userInfoData?.username
  );
  const _id = userInfoData && userInfoData?._id;

  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(editProfile({ _id, username, email, profile_photo }));
    setCounter((prev) => prev + 1);
    handleClose();
    dispatch(fetchLoggedInUserData(localStorageData.id));
    dispatch(fetchTweetsByUserId(localStorageData.id));
    dispatch(fetchCommentsById(localStorageData.id));
  };

  useEffect(() => {
    setUsername(userInfoData?.username);
    if (counter) {
      console.log("hey");
      history.push("/profile");
    }
  }, [dispatch, localStorageData.id, userInfoData, counter, _id, history]);

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
                name="username"
                placeholder="Edit username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
              <InputBase
                type="text"
                name="email"
                placeholder="Edit email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <br />
              <InputBase
                type="text"
                name="profile"
                placeholder="Edit profile photo"
                onChange={(e) => setProfile_photo(e.target.value)}
                value={profile_photo}
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

export default EditProfileForm;
