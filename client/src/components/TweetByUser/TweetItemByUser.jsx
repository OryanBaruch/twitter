import React from "react";
import TweetItem from "../tweetItem/TweetItem";
import { localStorageData } from "../../Redux/Actions/actionTypes";


const TweetItemByUser = ({ tweet, index , userInfoData}) => {
  
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
