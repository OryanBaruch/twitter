const router = require("express").Router();
const { user_model } = require("../Models/user.model");

router.get("/profile/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const profile = await user_model.find({ _id:_id });
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

module.exports = router;
