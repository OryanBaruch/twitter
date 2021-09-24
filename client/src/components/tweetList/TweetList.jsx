import React from "react";
import { useSelector } from "react-redux";
import PostTweetForm from "../postTweetForm/PostTweetForm";
import TweetItem from "../tweetItem/TweetItem";
import "./tweetList.css";

const TweetList = () => {
  const fetchTweetsReducer = useSelector((state) => state.fetchTweetsReducer);
  const { tweets } = fetchTweetsReducer;

  return (
    <>
        <div className="tweetListContainer">
          <PostTweetForm />
          {tweets ? (
            tweets.map((tweet, index) => (
              <TweetItem tweet={tweet} key={index} />
            ))
          ) : (
            <img
              src="https://i.pinimg.com/originals/2c/81/b7/2c81b7558f6576b48ae18317859be873.gif"
              alt="loading..."
            />
          )}
        </div>
    </>
  );
};

export default TweetList;
