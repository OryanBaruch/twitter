import React from "react";
import TweetItem from "../tweetItem/TweetItem";

const TweetItemByUser = ({ tweet, index }) => {
  const localStorageData = JSON.parse(localStorage.getItem("user_info"));
  
  return (
    <>
      {localStorageData?.id === tweet?.tweeterId?._id ? (
        <TweetItem tweet={tweet} key={index} />
      ) : (
        ""
      )}
    </>
  );
};

export default TweetItemByUser;
