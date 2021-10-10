import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useDispatch, useSelector } from "react-redux";
import { fetchTweets, postTweet } from "../../Redux/Actions/tweetActions";
import {
  Button,
  Divider,
  Paper,
  InputBase,
} from "@material-ui/core";
import { useHistory } from "react-router";

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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "30vw",
    height: "30vh",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const PostTweetModal = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({});
  const [counter, setCounter] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const loginReducer = useSelector((state) => state.loginReducer);
  const { userInfo } = loginReducer;

  const userInfoImage = userInfo?.profile_photo
    ? userInfo.profile_photo
    : JSON.parse(localStorage?.getItem("user_info"))?.profile_photo;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postTweet(formData.content, formData.image));
    setCounter((prev) => prev + 1);
    setFormData({ content: "", image: "" });
    handleClose();
    history.push("/homepage");
  };

  useEffect(() => {
      dispatch(fetchTweets());
  }, [counter, dispatch]);

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
        <Paper id="formPaperModal" className={classes.paper} elevation={3}>
          <Paper id="formPaperModal" className={classes.root} elevation={3}>
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
                    id="img"
                    className={classes.img}
                    src={userInfoImage}
                    alt="profilePhoto"
                  />
                </div>
              </form>
            </div>
          </Paper>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default PostTweetModal;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTweets, postTweet } from "../../Redux/Actions/tweetActions";
// import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import "./postTweet.css";
// import { Button, Divider, InputBase } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//   button: {
//     borderRadius: 25,
//     marginTop: "8%",
//     marginBottom: "2%",
//     width: "5vw",
//   },
//   img: {
//     width: "3vw",
//     height: "3vw",
//   },
//   inputBase: {
//     marginTop: "2%",
//   },
// }));

// const PostTweet = () => {
//   const [formData, setFormData] = useState({});
//   const [counter, setCounter] = useState(1);
//   const dispatch = useDispatch();
//   const classes = useStyles();

//   const loginReducer = useSelector((state) => state.loginReducer);
//   const { userInfo } = loginReducer;

//   const userInfoImage = userInfo?.profile_photo
//     ? userInfo.profile_photo
//     : JSON.parse(localStorage.getItem("user_info")).profile_photo;

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(postTweet(formData.content, formData.image));
//     setCounter((prev) => prev + 1);
//     setFormData({content:'', image:''});
//   };

//   useEffect(() => {
//     dispatch(fetchTweets());
//   }, [counter, dispatch]);

//   return (
//     <Paper id="formPaper" className={classes.root} elevation={3}>
//       <div>
//         <form className="formCon" onSubmit={(e) => handleSubmit(e)}>
//           <div>
//             <InputBase
//               type="text"
//               name="content"
//               placeholder="What's happening?..."
//               onChange={(e) => handleChange(e)}
//               className={classes.inputBase}
//               value={formData.content ? formData.content : ''}
//               />
//             <br />
//             <InputBase
//               type="text"
//               name="image"
//               placeholder="Insert Image..."
//               onChange={(e) => handleChange(e)}
//               value={formData.image ? formData.image: ''}
//             />
//             <br />
//             <Divider />
//           </div>
//           <div className="btn-div">
//             <Button
//               type="submit"
//               id="btn-holder"
//               className={classes.button}
//               variant="contained"
//               color="primary"
//               disabled={!formData.content}
//             >
//               Tweet
//             </Button>
//             <img
//               id="img"
//               className={classes.img}
//               src={userInfoImage}
//               alt="profilePhoto"
//             />
//           </div>
//         </form>
//       </div>
//     </Paper>
//   );
// };

// export default PostTweet;
