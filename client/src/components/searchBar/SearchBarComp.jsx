import { Button } from "@material-ui/core";
import SearchBar from "material-ui-search-bar";
import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";

import "./searchBar.css";
import { fetchProfileById } from "../../Redux/Actions/profileAction";
import { fetchTweetsByUserId } from "../../Redux/Actions/tweetActions";
import ProfileById from "../profile/ProfileById";

const SearchBarComp = () => {
  let [search, setSearch] = useState("");
  let [fetchData, setFetchData] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSearch(e);
  };

  const searchForUser = () => {
    setFetchData(true);
    history.push(`/profile-by-id/${search}`);
  };

  useEffect(() => {
    if (fetchData) {
      dispatch(fetchProfileById(search));
      dispatch(fetchTweetsByUserId(search));
    }
  }, [dispatch, search, fetchData]);
  return (
    <>
      <div className="searchBarContainer">
        <SearchBar value={search} onChange={(e) => handleChange(e)} />

        <Button
          onClick={() => searchForUser(search)}
          className="submitSearch"
          variant="contained"
        >
          Search
        </Button>
      </div>
      <br />
      <h3>{search}</h3>
    </>
  );
};

export default SearchBarComp;
