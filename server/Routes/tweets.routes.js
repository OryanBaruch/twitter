const router = require("express").Router();
const tweet_model = require("../Models/tweet.model");
const { user_model } = require("../Models/user.model");
const { user_auth, admin_auth } = require("../Auth/jwtAuth");

//all tweets
router.get(`/tweets`, user_auth, async (req, res) => {
  try {
    const fetchAllTweetsByLikes = await tweet_model
      .find()
      .populate("tweeterId");
    const fetchAllTweets = fetchAllTweetsByLikes.sort((a, b) =>
      a.likes.length < b.likes.length ? 1 : -1
    );
    return res.json({
      err: false,
      msg: "Fetched Tweets",
      fetchAllTweets,
    });
  } catch (error) {
    res.json({
      err: true,
      msg: "Failed to fetch",
      error,
    });
  }
});

//tweet by the id of the tweet
router.get("/single-tweet/:_id", user_auth, async (req, res) => {
  try {
    const { _id } = req.params;
    const fetchTweetById = await tweet_model.findOne({ _id }).populate({
      path: "tweeterId",
    });
    return res.status(201).json({
      err: false,
      msg: "Fetch Single tweet",
      fetchTweetById,
    });
  } catch (error) {
    return res.json({
      err: false,
      msg: "Error has applied",
      error,
    });
  }
});

//tweets by user
router.get(`/tweets-by-user-id/:tweeterId`, user_auth, async (req, res) => {
  try {
    const { tweeterId } = req.params;
    const fetchTweetsByUser = await tweet_model
      .find({ tweeterId })
      .populate("tweeterId");
    if (!fetchTweetsByUser.length)
      return res.status(500).json({
        error: true,
        msg: `No tweets.`,
      });
    return res.json({
      error: false,
      msg: `Tweets for ${fetchTweetsByUser[0].tweeterId.username}`,
      fetchTweetsByUser,
      numberOfTweets: fetchTweetsByUser.length,
    });
  } catch (error) {
    res.json({
      err: true,
      msg: "Failed to fetch Tweets by userId",
      error,
    });
  }
});

//Post new tweet
router.post("/post-tweet", user_auth, async (req, res) => {
  try {
    const { tweeterId, content, image } = req.body;
    const postNewTweet = await tweet_model.create({
      tweeterId,
      content,
      image,
    });

    // const user=await user_model.findById(tweeterId)
    // user.tweets=user.tweets.concat(postNewTweet._id)
    // await user.save()
    const fetchLatestTweet = await tweet_model
      .find({ _id: postNewTweet._id })
      .populate({
        path: "tweeterId",
      });
    return res.json({
      err: false,
      msg: "Tweeted successfully.",
      postNewTweet,
      fetchLatestTweet,
    });
  } catch (error) {
    console.log({
      err: true,
      msg: "Failed to post new tweet",
      error,
    });
  }
});

//Delete tweet by id of the tweet
router.delete("/remove-tweet/:_id", user_auth, async (req, res) => {
  try {
    const { _id } = req.params;
    await tweet_model.findOneAndUpdate({ _id }, { $set: { isActive: false } });
    const deleteTweetById = await tweet_model.findOneAndDelete({ _id });
    const filteredTweets = await tweet_model.find().populate({
      path: "tweeterId",
    });

    const fetchTweetsByUser = await tweet_model
      .find({ tweeterId: deleteTweetById.tweeterId })
      .populate("tweeterId")
      .populate({ path: "tweeter" });

    return res.json({
      error: false,
      msg: "Removed tweet",
      deleteTweetById,
      filteredTweets,
      fetchTweetsByUser,
    });
  } catch (error) {
    return res.status(418).json({
      err: true,
      msg: "Error in remove the tweet.",
      error,
    });
  }
});

//Edit the tweet by the id of the tweet
router.put("/edit-tweet/:_id", user_auth, async (req, res) => {
  try {
    const { _id } = req.params;
    const { content, image } = req.body;
    const editedTweet = await tweet_model
      .findOneAndUpdate({ _id }, { content, image }, { new: true })
      .populate({
        path: "tweeterId",
      });

    const fetchAllTweets = await tweet_model.find().populate({
      path: "tweeterId",
    });

    const fetchTweetsByUser = await tweet_model
      .find({ tweeterId: editedTweet.tweeterId._id })
      .populate("tweeterId")
      .populate({ path: "tweeter" });

    res.json({
      error: false,
      msg: "Edited tweet",
      editedTweet,
      fetchAllTweets,
      fetchTweetsByUser,
    });
  } catch (error) {
    console.log({ error });
  }
});

router.put("/toggleLike/:_id", user_auth, async (req, res) => {
  try {
    const { _id } = req.params;
    const { tweeterId } = req.body;
    const fetchTweetById = await tweet_model.findOne({ _id }).populate({
      path: "tweeterId",
    });
    const checkIfUserLiked = fetchTweetById.likes;
    if (checkIfUserLiked.includes(tweeterId)) {
      const toggleLikeTweet = await tweet_model.findOneAndUpdate(
        { _id },
        {
          $pull: {
            likes: tweeterId,
          },
          liked: false,
        },
        { new: true, returnNewDocument: true }
      );
      return res.status(201).json({
        err: false,
        msg: "UnLiked ",
        toggleLikeTweet,
      });
    } else {
      const toggleLikeTweet = await tweet_model.findOneAndUpdate(
        { _id },
        {
          $push: {
            likes: tweeterId,
          },
          liked: true,
        },
        { new: true, returnNewDocument: true }
      );

      return res.status(201).json({
        err: false,
        msg: "Liked ",
        toggleLikeTweet,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: "Couldnt activate like pattern.",
      error,
    });
  }
});

//save and unsave Posts in one route (by update)

router.put("/toggle-save-posts/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const { postId } = req.body;
    const fetchSavedPosts = await user_model
      .findOne({ _id })
      .populate("tweeterId");
    const checkIfUserSaved = fetchSavedPosts.savedPosts;
    if (checkIfUserSaved.includes(postId)) {
      const toggleSaveTweet = await user_model
        .findOneAndUpdate(
          { _id: _id },
          {
            $pull: {
              savedPosts: postId,
            },
          },
          { new: true, returnNewDocument: true }
        )
        .populate({
          path: "savedPosts",
        })
        .populate("tweeterId");

      return res.status(201).json({
        err: false,
        msg: "UnSaved ",
        toggleSaveTweet,
      });
    } else {
      const toggleSaveTweet = await user_model
        .findOneAndUpdate(
          { _id: _id },
          {
            $push: {
              savedPosts: postId,
            },
          },
          { new: true, returnNewDocument: true }
        )
        .populate({
          path: "savedPosts",
        })
        .populate("tweeterId");

      return res.status(201).json({
        err: false,
        msg: "Saved Post ",
        toggleSaveTweet,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: "Couldnt Save Post.",
      error,
    });
  }
});

module.exports = router;
