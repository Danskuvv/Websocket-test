"use strict";

const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("join room", ({ nickname, room }) => {
    socket.join(room);
    socket.nickname = nickname;
    socket.room = room;
    console.log(`${nickname} joined room ${room}`);
    io.to(room).emit("chat message", `${nickname} has joined the room`);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    if (socket.nickname && socket.room) {
      io.to(socket.room).emit(
        "chat message",
        `${socket.nickname} has left the room`
      );
    }
  });

  socket.on("chat message", (msg) => {
    console.log("message: ", msg);
    if (socket.nickname && socket.room) {
      io.to(socket.room).emit("chat message", `${socket.nickname}: ${msg}`);
    }
  });
});

http.listen(3000, () => {
  console.log("listening on port 3000");
});
