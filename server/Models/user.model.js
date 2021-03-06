const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    birthday: { type: String, require: true },
    profile_photo: { type: String },
    liked: { type: Boolean, default: false },
    role: { type: Number, default: 0 },
    joinedAt: { type: Date, default: new Date() },
    tweeterId: { type: Schema.Types.ObjectId, ref: "tweeter" },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "follow",
      },
    ],
    savedPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: "tweeter",
      },
    ],

  },
  { versionKey: false }
);

const user_model = model(`user`, userSchema);

const initUsers = async () => {
  const initUser = new user_model({
    username: "admin",
    email: "admin@admin",
    password: "123",
    birthday: `2000-01-01`,
    profile_photo: "None",
  });
  await initUser.save();
};

module.exports = { user_model, initUsers };
