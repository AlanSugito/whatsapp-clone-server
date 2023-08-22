const { Server } = require("socket.io");
const { ChatService } = require("../services");

const websocket = (server) => {
  const chatService = new ChatService();
  const userConnected = [];
  const io = new Server(server, { cors: { origin: "http://localhost:5173" } });

  const addUserOnline = (data) => {
    const userAlreadyOn = userConnected.some(
      (user) => user.userId === data.userId
    );
    if (userAlreadyOn) {
      return;
    }

    userConnected.push(data);
  };

  const getSocketId = (userId) => {
    const user = userConnected.find((user) => user.userId === userId);
    return user.socketId;
  };

  let chatCount = 0;
  io.on("connection", (socket) => {
    socket.on("online", (data) => {
      addUserOnline({ userId: data, socketId: socket.id });
    });

    socket.on("keydown", (data) => {
      io.emit("type", data);
    });

    socket.on("keyup", (data) => {
      io.emit("untype", data);
    });

    socket.on("message", async ({ receiverId, ...data }) => {
      const chat = await chatService.create(data);
      chatCount++;
      io.emit("receive", {
        conversationId: data.conversationId,
        chat,
      });
      io.emit("unread", { receiverId, chatCount });
    });

    socket.on("read", () => {
      chatCount = 0;
    });

    socket.on("disconnect", () => {
      console.log("Someone disconnected");
    });
  });
};

module.exports = websocket;
