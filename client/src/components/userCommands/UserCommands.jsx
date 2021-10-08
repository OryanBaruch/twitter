import { IconButton } from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import React from "react";


const UserCommands = ({ handleOpenEdit,  handleDelete}) => {

  return (
    <>
      <Delete onClick={handleDelete} className="delete" />
      <IconButton onClick={handleOpenEdit} className="edit">
        <Edit />
      </IconButton>
    </>
  );
};

export default UserCommands;
