const express = require("express");
const socketIO = require("socket.io");
const path = require("path");
const http = require("http");


const app = express();
const server = http.createServer(app);


let pathPublico = path.resolve( __dirname, "../public" );


app.use(express.static(pathPublico));

module.exports.io = socketIO(server);
require("./sockets/socket");


server.listen(4000, error => {

    if(error){
        return new Error(error);
    }

    console.log("Conectado al servidor 4000");
});

