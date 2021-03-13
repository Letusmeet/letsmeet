const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const { MONGOURI } = require("./keys/key");

//----------------------db connection-------------------//

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("connected to mongo ");
});
mongoose.connection.on("error", (err) => {
  console.log("error connecting", err);
});

//-------------------------models-------------
require("./models/user");
require("./models/board");
require("./models/card");
require("./models/Conversation");
require("./models/Message");
require("./models/office");
require("./models/room");

const server = app.listen(port, () => {
  console.log(`server on port ${port}`);
});

const io = require("socket.io")(server);
app.use(function (req, res, next) {
  req.io = io;
  next();
});

//------------------------routes-------------
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/board"));
app.use(require("./routes/chat"));
app.use(require("./routes/room"));
app.use(require("./routes/users"));
