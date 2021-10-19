const router = require("express").Router();
const { user_model } = require("../Models/user.model");
const { user_auth, admin_auth } = require("../Auth/jwtAuth");

router.get("/profile/:_id", user_auth, async (req, res) => {
  try {
    const { _id } = req.params;
    const profile = await user_model.find({ _id: _id });
    res.status(201).json({
      error: false,
      msg: `Profile of ${profile[0].username}`,
      profile: profile[0],
    });
  } catch (error) {
    res.json({
      error: true,
      msg: "Couldnt fetch profile",
      error,
    });
  }
});

router.put("/edit-profile/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const { username, email, profile_photo} = req.body;
    const editProfile = await user_model.findOneAndUpdate(
      { _id },
      { username, email , profile_photo},
      { new: true }
    );
    return res.status(205).json({
      error: false,
      msg: "Succesfully edited profle.",
      editProfile,
    });
  } catch (error) {
    res.json({
      error: true,
      msg: "Couldnt Edit profile",
      error,
    });
  }
});
module.exports = router;
