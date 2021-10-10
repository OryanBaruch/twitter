const { Schema, model } = require("mongoose");

const followSchema = new Schema(
  {
    isFollowed: { type: Boolean, default: false },
    follow:[],
    followersNumber: { type: Number, default: 0 },
    userId: { type: Schema.Types.ObjectId, ref: "user" },
  },
  { versionKey: false }
);

const follow_model = model("follow", followSchema);

module.exports = follow_model;
