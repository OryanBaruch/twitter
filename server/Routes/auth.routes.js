const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { user_model } = require("../Models/user.model");
require("dotenv").config();

const invalidMsg = "Invalid Email/Password";

router.post("/register", async (req, res) => {
  try {
    const { username, password, profile_photo, birthday, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const registerNewUser = await user_model.create({
      username,
      password: hashedPassword,
      profile_photo,
      birthday,
      email,
    });
    return res.json({
      error: false,
      msg: "New user has been registered",
      registerNewUser,
    });
  } catch (error) {
    return res.status(401).json({
      err: true,
      msg: error,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await user_model.findOne({ email });
    if (!user)
      return res.status(401).json({ error: true, msg: "User not found" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: true, msg: invalidMsg });

    const access_token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
        profile_photo: user.profile_photo,
        age: user.age,
        birthday: user.birthday,
        role: user.role,
      },
      `${process.env.ACCESS_TOKNE_SECRET}`,
      {
        expiresIn: "100d",
      }
    );

    return res.json({
      error: false,
      msg: `Welcome ${user.username}`,
      access_token,
    });
  } catch (error) {
    return res.status(404).json({
      err: true,
      msg: error,
    });
  }
});

router.get("/user-data/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const userData = await user_model.find({ _id:_id });
    return res.status(201).json({
      err: false,
      msg: "Fetched data for user",
      userData,
    });
  } catch (error) {
    console.log(error);
  }
});
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await user_model.findOne({ email });
//     if (!user) return res.status(401).json({ error: true, msg: invalidMsg });
//     const match = await bcrypt.compare(password, user.password);
//     if (!match || !user) return res.status(401).json({ error: true, msg: invalidMsg });

//     const access_token = jwt.sign(
//       {
//         id: user._id,
//         email: user.email,
//         username: user.username,
//         profile_photo: user.profile_photo,
//         age: user.age,
//         birthday: user.birthday,
//       },
//       `${process.env.ACCESS_TOKNE_SECRET}`
//     );

//     return res.json({
//       error: false,
//       msg: `Welcome ${user.username}`,
//       access_token,
//     });
//   } catch (error) {
//     return res.status(404).json({
//       err: true,
//       msg: invalidMsg,
//     });
//   }
// });

module.exports = router;
