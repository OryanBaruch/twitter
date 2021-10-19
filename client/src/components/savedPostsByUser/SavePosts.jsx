import React , {useEffect} from "react";
import { useSelector } from "react-redux";
import TweetItem from "../tweetItem/TweetItem";
import { localStorageData } from "../../Redux/Actions/actionTypes";

const SavePosts = ({ tweet, userInfoData, index }) => {

  return (
    <>
      {localStorageData?.id === userInfoData?._id ? (
        <TweetItem userInfoData={userInfoData} tweet={tweet} key={index} />
      ) : (
        ""
      )}
    </>
  );
};

export default SavePosts;
