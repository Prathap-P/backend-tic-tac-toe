var app = require('express')();
var httpServer = require('http').createServer(app);
require("dotenv").config();


const io = require('socket.io')(httpServer, {
    cors: {
        origin: '*'
    }
});

io.on("connection", (socket) => {
    
    socket.on("joinRoom", (id) => {
        console.log(`Joined Room with ID : ${socket.id}`);
        socket.join(id);
    })
    
    socket.on("canMove", (info) => {
        let roomId= info[0], boxNum= info[1]; 
        console.log("canMove");
        socket.to(roomId).emit("canMove", boxNum);
    })
    
    socket.on("disconnect", () => {
        socket.leave(roomId);
        console.log("Disconnected");
    })
});

httpServer.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
})
