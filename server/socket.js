module.exports = socketConnection = (httpServer) => {
  const io = require("socket.io")(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    const id = socket.handshake.query.id;
    socket.join(id);

    socket.on("send-message", ({ reciever, message }) => {
      socket.broadcast.to(reciever).emit("recieve-message", {
        message,
        sender: id,
        reciever: id,
      });
    });

    // socket.on("join", (data) => {
    //   const { id, name, room } = data;
    //   socket.join(room);

    //   socket.broadcast
    //     .to(room)
    //     .emit("broadcast", `${name} id: ${id} has joined room: ${room}`);

    //   socket.on("serverMessage", (msg) => {
    //     io.to(room).emit("clientMessage", msg);
    //   });

    //   socket.on("personalServerMessage", (data) => {
    //     console.log(data.id);
    //     io.to(data.id).emit("personalClientMessage", data.msg);
    //   });
    // });

    // socket.on("disconnect", (reason) => {
    //   io.emit("broadcast", "user offline");
    //   console.log(`disconnect due to ${reason}`);
    // });
  });
};
