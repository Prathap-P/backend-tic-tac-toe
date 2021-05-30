var app = require('express')();
var httpServer = require('http').createServer(app);
require("dotenv").config();


const io = require('socket.io')(httpServer, {
    cors: {
        origin: '*'
    }
});

io.on("connection", (socket) => {
    let roomId;
    
    socket.on("joinRoom", (id) => {
        console.log(`Joined Room with ID : ${socket.id}`);
        roomId= id;
        socket.join(roomId);
    })
    
    socket.on("canMove", (boxNum) => {
        console.log("canMove");
        socket.to(roomId).emit("canMove", boxNum);
    })
    
    socket.on("disconnect", () => {
        socket.leave(roomId);
        console.log("Disconnected");
    })
});

httpServer.listen(process.env.PORT, () => {
    console.log(`App listening on port 9000`);
})
