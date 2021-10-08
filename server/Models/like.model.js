const { Schema, model } = require("mongoose");

const likeSchema = new Schema(
  {
    isLiked: { type: Boolean, default: false },
    likesNumber: { type: Number, default: 31 },
    postId: { type: Schema.Types.ObjectId, ref: "tweeter" },
    tweeterId: { type: Schema.Types.ObjectId, ref: "user" },
  },
  { versionKey: false }
);

const like_model = model("like", likeSchema);

module.exports = like_model;
