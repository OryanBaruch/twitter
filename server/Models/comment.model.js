const { Schema, model } = require("mongoose");

const CommentSchema = new Schema(
  {
    comment: { type: String },
    tweeterId: { type: Schema.Types.ObjectId, ref: "user" },
    postId: { type: Schema.Types.ObjectId, ref: "tweeter" },
    dateOfComment: { type: Date, default: new Date() },
  },
  { versionKey: false }
);

const comment_model = model("comment", CommentSchema);

module.exports = comment_model;
