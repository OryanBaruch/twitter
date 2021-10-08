const router = require("express").Router();
const { user_model } = require("../Models/user.model");

router.get("/profile/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const profile = await user_model.find({ _id:_id });
    console.log("1", req.params);
    console.log("2", req.params._id);
    // !profile.length
    //   ? res.json({
    //       msg: "Profile does not exist",
    //     })
    //   :
      res.status(201).json({
        error: false,
        msg: `Profile of ${profile[0].username}`,
        profile: profile[0],
      });
  } catch (error) {
    res.json({
      blah1: req,
      blah: req.params,
      error: true,
      msg: "Couldnt fetch profile",
      error,
    });
  }
});

module.exports = router;
