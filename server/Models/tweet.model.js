const { Schema, model } = require("mongoose");

const TweetSchema = new Schema(
  {
    content: String,
    image: String,
    tweeterId: { type: Schema.Types.ObjectId, ref: "user" },
    liked: { type: Boolean, default: false },
    likes: [],
    publishedAt: { type: Date, default: new Date() },
    isActive: { type: Boolean, default: true },
  },
  { versionKey: false }
);

const tweet_model = model("tweeter", TweetSchema);

module.exports = tweet_model;
