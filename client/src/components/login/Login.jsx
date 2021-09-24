import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { loginAction } from "../../Redux/Actions/userActions";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./login.css";
import SnackbarAlert from "../snackbar/SnackbarAlert";

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
    width: "40%",
  },
  input: {
    border: "1px solid gray",
    width: "40%",
    borderRadius: 25,
    margin: theme.spacing(1),
  },
}));

const Login = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const loginReducer = useSelector((state) => state.loginReducer);
  const { error, msg, isAllowed } = loginReducer;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAction(formData));
  };

  useEffect(() => {
    if (isAllowed) {
      history.push("/homepage");
    }
  }, [history, isAllowed]);

  return (
    <>
      {msg && <SnackbarAlert msg={msg} error={error} />}
      <div className="container">
        <div className="imageDiv">
          <img className='top' src="/photos/pngwing.com.png" alt="logoBird" />
          <img
            className="imageCover"
            src="https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png"
            alt="bird"
          />
        </div>
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
          <h1>
            <strong>Happening now</strong>
          </h1>
          <TextField
            type="text"
            name="email"
            placeholder="Email..."
            onChange={(e) => handleChange(e)}
            required
            id="standard-required"
            label="Email..."
            InputLabelProps={{ style: { fontSize: 15 } }}
            underline="false"
            InputProps={{ disableUnderline: true }}
            className={classes.input}
          />
          <TextField
            type="password"
            name="password"
            onChange={(e) => handleChange(e)}
            required
            id="standard-required"
            label="Password..."
            InputLabelProps={{
              style: {
                width: "-webkit-fill-available",
              },
            }}
            className={classes.input}
            InputProps={{ disableUnderline: true, textalign: "center" }}
          />
          <Button
            label="Submit"
            className={classes.button}
            type="submit"
            value="login"
            variant="contained"
          >
            Login
          </Button>
          <br />
          Not a registered user? <a href="/register"> Register</a>
        </form>
      </div>
    </>
  );
};

export default Login;
