import React, {useState} from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarAlert = ({ msg, error }) => {
  const [open, setOpen] = useState(true);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
   <Snackbar 
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }} open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={error ? 'error' : 'success'}>
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackbarAlert;
