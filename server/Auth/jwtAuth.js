const jwt = require("jsonwebtoken");
require("dotenv").config();

const user_auth = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.json("Token must be provied");
  jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`, (err, payload) => {
    if (err)
      return res
        .status(401)
        .json({ msg: "Only users can see this page.", err });
    req.user = payload;
    return next();
  });
};

const admin_auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.json("Token must be provied");
  jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`, (err, payload) => {
    if (err)
      return res
        .status(401)
        .json({ msg: "Only users can see this page.", err });
    req.user = payload;
    if (payload.role === 0)
      return res.json({
        unAuth: true,
        msg: "Only Admin allowed to do this.",
      });
    return next();
  });
};

module.exports = {user_auth, admin_auth};
