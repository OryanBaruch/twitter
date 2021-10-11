import { Button } from "@material-ui/core";
import SearchBar from "material-ui-search-bar";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./searchBar.css";
import { fetchProfileById } from "../../Redux/Actions/profileAction";
import { fetchTweetsByUserId } from "../../Redux/Actions/tweetActions";
import { fetchAllUsers } from "../../Redux/Actions/userActions";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import ProfileById from "../profile/ProfileById";

const SearchBarComp = () => {
  let [search, setSearch] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const fetchAllUsersReducer = useSelector(
    (state) => state.fetchAllUsersReducer
  );
  const { users } = fetchAllUsersReducer;

  const handleChange = (e) => {
    localStorage.setItem("search", e.target.value);
    localStorage.removeItem("userId");
    history.push(`/profile-by-id/${localStorage.getItem("search")}`);
  };

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch, search]);

  return (
    <>
      <Box sx={{ minWidth: 120 }} className="searchBarContainer">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Search User</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Search User"
            onChange={handleChange}
            value={''}
          >
            {users?.map((user, index) => (
              <MenuItem value={user._id} key={index}>
                {" "}
                <div className='dropDownContent'>
                {user.username}
                <img className='profile_photo_dropDown' src={user.profile_photo} alt="profile" />
                </div>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default SearchBarComp;
