const router = require("express").Router();
const comment_model = require("../Models/comment.model");

router.get("/fetch-post-by-user-comments/:tweeterId", async (req, res) => {
  try {
    const { tweeterId } = req.params;
    const fetchCommentsById = await comment_model
      .find({ tweeterId })
      .populate({
        path: "tweeterId",
      })
      .populate({
        path : 'postId',
        populate : {
          path : 'tweeterId'
        }
      })

    if (!fetchCommentsById.length)
      return res.json({
        msg: `Didn't posted any comments yet.`,
      });

    return res.status(203).json({
      error: false,
      msg: `Comments for user number ${tweeterId}`,
      fetchCommentsById,
    });
  } catch (error) {
    return res.json({
      err: true,
      msg: "Couldnt fetch comments",
      error,
    });
  }
});

router.post("/post-comment/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const { tweeterId, comment } = req.body;
    const newComment = await comment_model.create({
      tweeterId,
      comment,
      postId,
    });
    const fetchComments = await comment_model
      .find({
        tweeterId,
      })
      .populate({
        path: "tweeterId",
      })
      .populate({
        path: "postId",
      });

    return res.status(201).json({
      err: false,
      msg: "Commented !",
      newComment,
      fetchComments,
    });
  } catch (error) {
    return res.json({
      err: true,
      msg: "Could not post new comment",
      error,
    });
  }
});

module.exports = router;
