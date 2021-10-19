const router = require("express").Router();
const comment_model = require("../Models/comment.model");
const {user_auth, admin_auth}=require('../Auth/jwtAuth')

router.get("/fetch-post-by-user-comments/:tweeterId", user_auth, async (req, res) => {
  try {
    const { tweeterId } = req.params;
    const fetchCommentsById = await comment_model
      .find({ tweeterId })
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
      msg: `Fetching comments`,
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

router.post("/post-comment/:postId",user_auth ,async (req, res) => {
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

router.delete('/remove-comment/:_id',user_auth ,async (req, res)=>{
  try {
    const {_id}=req.params;
    const {tweeterId}=req.body;
    const removeComment=await comment_model.findOneAndDelete({_id})
    const fetchCommentsById = await comment_model
    .find({ tweeterId })
    .populate({
      path : 'postId',
      populate : {
        path : 'tweeterId'
      }
    })
    return res.status(201).json({
      error:false,
      msg:'Removed comment',
      removeComment,
      fetchCommentsById
    })
  } catch (error) {
    return res.json({
      error:true, 
      msg:'Failed to remove comment',
      error
    })
  }
})

module.exports = router;
