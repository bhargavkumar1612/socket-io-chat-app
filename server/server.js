const io = require("socket.io")(
    3000,
    {cors: {origin: ["http://localhost:8080"]}}
)

io.on("connection", (socket) => {
    console.log("a user connected")
    console.log("user id: "+ socket.id)
    socket.on("disconnect", () => {
    console.log("user disconnected")
    console.log("user id: "+ socket.id)
  })
  socket.on("send-message", (msg, room_id) => {
    if (room_id === ""){
        socket.broadcast.emit("message-received",msg)
    }
    else{
        socket.to(room_id).emit("message-received",msg)
    }
  })
    socket.on("join-room", (room_id) => {
        socket.join(room_id)
    })
})