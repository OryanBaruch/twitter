import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { registerAction } from "../../Redux/Actions/userActions";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "./register.css";

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

const Register = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      registerAction(
        formData.username,
        formData.password,
        formData.email,
        formData.birthday,
        formData.profile_photo
      )
    );
    console.log(formData);
    history.push("/login");
  };

  return (
    <div className="container">
      <div className="imageDiv">
        <img
          className="imageCover"
          src="https://www.pngitem.com/pimgs/m/240-2408619_twitter-splash-icon-png-image-free-download-searchpng.png"
          alt="bird"
        />
      </div>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <TextField
          type="text"
          name="username"
          placeholder="username..."
          onChange={(e) => handleChange(e)}
          required
          id="standard-required"
          label="Username..."
          InputLabelProps={{ style: { fontSize: 15 } }}
          underline="false"
          InputProps={{ disableUnderline: true }}
          className={classes.input}
        />

        <TextField
          type="text"
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
        <TextField
          type="text"
          name="email"
          onChange={(e) => handleChange(e)}
          required
          id="standard-required"
          label="Email..."
          InputLabelProps={{
            style: {
              width: "-webkit-fill-available",
            },
          }}
          className={classes.input}
          InputProps={{ disableUnderline: true, textalign: "center" }}
        />

        <TextField
          type="text"
          name="profile_photo"
          onChange={(e) => handleChange(e)}
          required
          id="standard-required"
          label="Profile picture..."
          InputLabelProps={{
            style: {
              width: "-webkit-fill-available",
            },
          }}
          className={classes.input}
          InputProps={{ disableUnderline: true, textalign: "center" }}
        />
        <label htmlFor="birthday">Birthday</label>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Date picker dialog"
            format="MM/dd/yyyy"
            value={new Date()}
            onChange={handleChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>

        <Button
          label="Submit"
          className={classes.button}
          type="submit"
          value="Register"
          variant="contained"
        >
          Register
        </Button>
      Already a member? <a href="/login"> Login</a>
      </form>
    </div>
  );
};

export default Register;

