const express = require("express");
const mongoose = require("mongoose");
const { KEY } = require("./key");
const cookieParser = require("cookie-parser");
const { register, login } = require("./controllers/user");
const mapUser = require("./helpers/mapUser");

const port = 3001;
const app = express();

app.use(cookieParser());
app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const user = await register(req.body.login, req.body.password);
    res.send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Unknown user" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password);
    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Unknown user" });
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true }).send({});
});

mongoose.connect(KEY).then(() => {
  app.listen(port, () => {
    console.log(`Server started at port ${port}`);
  });
});
