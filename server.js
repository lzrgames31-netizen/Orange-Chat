const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("Novo usuário conectado");

  socket.on("register", (user) => {
    socket.user = user;
    console.log(`${user} entrou`);
  });

  socket.on("message", (msg) => {
    // manda só pros outros usuários (não ecoa de volta)
    socket.broadcast.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.user || "alguém"} saiu`);
  });
});

server.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
