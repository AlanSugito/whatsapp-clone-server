const express = require("express");
const cors = require("cors");
const multer = require("multer");

const { storage } = require("./src/configs");
const users = require("./src/API/users");
const conversation = require("./src/API/conversation");
const chat = require("./src/API/chat");
const websocket = require("./src/websocket");
const errorHandler = require("./src/API/middlewares/errorHandler");

const app = express();
const router = express.Router();

app.use(cors());
app.use(multer({ storage }).single("image"));
app.use(express.static("public"));
app.use(express.json());

app.use("/users", users());
app.use("/chats", chat());
app.use("/conversations", conversation());
app.use(errorHandler);

const server = app.listen(2000, () => {
  console.log("server is listening at port 2000");
});

websocket(server);
