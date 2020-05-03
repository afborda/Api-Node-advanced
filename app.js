const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const api = require("./routes/api");
const auth = require("./routes/auth");
const consts = require("./consts");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(consts.linkNode, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api", api);
app.use("/auth", auth);

app.use(function (req, res, next) {
  res.status(404).send("Not Found!");
});

app.listen(3333);
