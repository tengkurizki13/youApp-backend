const env = require("dotenv").config();
const express = require("express");
const router = require("./routes");
const app = express();

const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io");
const io = new Server(server)

const port = process.env.PORT || 3030;
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);


io.on("connection",(socket) => {
  socket.on("message",(data) => {
    const {id,message} = data
    socket.broadcast.emit("message",id,message)
  })
})

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  
