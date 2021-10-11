import { Paper } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import "./mostFollowed.css";
import { styled } from "@mui/material/styles";

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  padding: theme.spacing(0),
  color:'gray'
}));

const MostFollowed = () => {
  const fetchAllUsersReducer = useSelector(
    (state) => state.fetchAllUsersReducer
  );
  const { users } = fetchAllUsersReducer;

  return (
      <>
      <Div className='mostFollowersHeader'>Top followers on tweeter</Div>
        <Paper className="mostFollowedContainer">
          <div>
            {users?.slice(0, 3).map((user, index) => (
              <div className="followedUsers" key={index}>
                <Div>Followers:</Div> <Div>{user.followers.length}</Div>
                <Div>{user.username}</Div>
                <img
                  className="mostFollowedImage"
                  src={user.profile_photo}
                  alt=""
                />
              </div>
            ))}
          </div>
        </Paper>
      </>
  );
};

export default MostFollowed;
