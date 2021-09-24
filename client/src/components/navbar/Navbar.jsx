import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { userLogoutAction } from "../../Redux/Actions/userActions";
import { Button, Paper } from "@material-ui/core";
import Home from "@material-ui/icons/Home";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Person from "@material-ui/icons/Person";
import BookmarkBorder from "@material-ui/icons/BookmarkBorder";
import { makeStyles } from "@material-ui/core/styles";

import "./navbar.css";
import PostTweetModal from "../postTweetModal/PostTweetModal";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  button: {
    borderRadius: 25,
    backgroundColor: "#1DA1F2",
    width: "100%",
    color:'white',
    fontWeight:'bolder'
  },
  input: {
    border: "1px solid gray",
    width: "40%",
    borderRadius: 25,
    margin: theme.spacing(1),
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(userLogoutAction());
    history.push("/login");
  };

  const backToHomePage = () => {
    history.push("/homepage");
  };

  return (
    <>
      <Paper className="navBarContainer">
        <img
          onClick={backToHomePage}
          className="birdLogo"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSukpukvqe5-KwnN62PTmpMzmuMlP8AdDINVYUddfBDqnZQkgXRCAuaBaqG_ZZrEv3cbng&usqp=CAU"
          alt="bird"
        />
        <div className="iconAndLink">
          <Button>
            <BookmarkBorder className="icon" />
            Bookmarks
          </Button>
        </div>
        <div className="iconAndLink">
          <Button>
            <Person className="icon" />
            <a href="/Profile">Profile</a>
          </Button>
        </div>
        <div className="iconAndLink">
          <Button>
            <Home className="icon" />
            <a href="/homepage">home</a>
          </Button>
        </div>
        <div className="iconAndLink">
          <Button onClick={handleLogout}>
            <ExitToApp className="icon" />
            logout
          </Button>
        </div>
        <div className="iconAndLink" id="tweet">
          <Button onClick={handleOpen} className={classes.button}>
            Tweet
          </Button>
        </div>
      </Paper>
      <PostTweetModal open={open} handleClose={handleClose} />
    </>
  );
};

export default Navbar;
