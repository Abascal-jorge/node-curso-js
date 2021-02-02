const express = require("express");
const path = require("path");
const socketIO = require("socket.io");
const cors = require("cors");
const http = require("http");
const app = express();
const server = http.createServer(app);


const publicPath = path.resolve(__dirname, `../public`);
const port = process.env.PORT || 4000;

//Habilitar cors
const opcionesCors = {
    origin: process.env.FRONTEND_URL
}
app.use( cors(opcionesCors) );
/////////////////

app.use(express.static(publicPath));
let io = socketIO(server);

io.on("connection", (client) => {
    console.log(client);
});

server.listen(port, (error) => {
    if(error){
        console.log(error);
    }
    console.log("Conectado al servidor....");
});