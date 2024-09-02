"use strict";

// Server URL below must point to your server, localhost works for local development/testing
const socket = io("http://localhost:3000");
let nickname = "";

document.getElementById("join-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const nickname = document.getElementById("nickname").value;
  const room = document.getElementById("room").value;
  socket.emit("join room", { nickname, room });
  document.getElementById("join-form").style.display = "none";
  document.getElementById("chat-form").style.display = "block";
});

document.getElementById("chat-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const inp = document.getElementById("m");
  const message = `${nickname}: ${inp.value}`;
  socket.emit("chat message", message);
  inp.value = "";
});

socket.on("chat message", (msg) => {
  const item = document.createElement("li");
  item.innerHTML = msg;
  document.getElementById("messages").appendChild(item);
});
