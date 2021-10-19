import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTweets, postTweet } from "../../Redux/Actions/tweetActions";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import "./postTweet.css";
import { Button, Divider, InputBase } from "@material-ui/core";
import { useHistory } from "react-router";
import SnackbarAlert from "../snackbar/SnackbarAlert";
import { fetchLoggedInUserData } from "../../Redux/Actions/userActions";
import { localStorageData } from "../../Redux/Actions/actionTypes";


const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: 25,
    marginTop: "8%",
    marginBottom: "2%",
    width: "5vw",
  },
  img: {
    width: "3vw",
    height: "3vw",
  },
  inputBase: {
    marginTop: "2%",
  },
}));

const PostTweet = () => {
  const [formData, setFormData] = useState({});
  const [counter, setCounter] = useState(1);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const postTweetReducer = useSelector(state => state.postTweetReducer)
  const {msg, error}=postTweetReducer;

  const fetchUserDataReducer = useSelector(
    (state) => state.fetchUserDataReducer
  );
  const { userInfo } = fetchUserDataReducer;
  const userInfoData = userInfo && userInfo;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postTweet(formData.content, formData.image));
    setCounter((prev) => prev + 1);
    setFormData({ content: "", image: "" });
  };
  
  const redirectProfile = () => {
    history.push("/profile");
  };
  
  useEffect(() => {
    dispatch(fetchTweets());
    dispatch(fetchLoggedInUserData(localStorageData?.id));
  }, [counter, dispatch]);

  return (
    <>
      {msg && (
        <SnackbarAlert msg={msg} error={error} />
      )}
      <Paper id="formPaperCard" className={classes.root} elevation={3}>
        <div>
          <form className="formCon" onSubmit={(e) => handleSubmit(e)}>
            <div>
              <InputBase
                type="text"
                name="content"
                placeholder="What's happening?..."
                onChange={(e) => handleChange(e)}
                className={classes.inputBase}
                value={formData.content ? formData.content : ""}
              />
              <br />
              <InputBase
                type="text"
                name="image"
                placeholder="Insert Image..."
                onChange={(e) => handleChange(e)}
                value={formData.image ? formData.image : ""}
              />
              <br />
              <Divider />
            </div>
            <div className="btn-div">
              <Button
                type="submit"
                id="btn-holder"
                className={classes.button}
                variant="contained"
                color="primary"
                disabled={!formData.content}
              >
                Tweet
              </Button>
              <img
                onClick={redirectProfile}
                id="img"
                className={classes.img}
                src={userInfoData?.profile_photo ? userInfoData?.profile_photo :localStorageData?.profile_photo}
                alt="profilePhoto"
              />
            </div>
          </form>
        </div>
      </Paper>
    </>
  );
};

export default PostTweet;
