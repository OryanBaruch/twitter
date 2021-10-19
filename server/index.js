const express = require("express");
const cors = require("cors");
const port = process.env.port || 4500;
const connect_mongoose = require("./mongoDb/DBcongif");
const { initUsers } = require("./Models/user.model");
const path = require('path');

const initDB = async () => {
  await initUsers();
};
// initDB()
connect_mongoose();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", require("./Routes/auth.routes"));
app.use("/tweet", require("./Routes/tweets.routes"));
app.use("/comment", require("./Routes/comments.routes"));
app.use("/profile", require("./Routes/profile.routes"));
app.use("/follow", require("./Routes/follow.routes"));

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

app.listen(process.env.port || 4500, console.log(`Go on ${process.env.port || 4500}, Enjoy.`));
