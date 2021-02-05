const express = require("express");
const path = require("path");
const socketIO = require("socket.io");
const cors = require("cors");
const http = require("http");
const app = express();
const server = http.createServer(app);

//Habilitar cors
const opcionesCors = {
    origin: process.env.FRONTEND_URL
}
app.use( cors() );
/////////////////

const publicPath = path.resolve(__dirname, `../public`);
const port = process.env.PORT || 4000;

app.get("/usuario", (req, res) => {
    res.json({
        message: "Desde usuario get"
    });
});

app.use(express.static(publicPath));

let io = socketIO(server);

//Socket 
io.on("connection", (client) => {
    console.log("Cliente conectado");

    //Detectar una desconecion de un usuario
    client.on("disconnect", () => {
        console.log("===========Usuario desconectado===============");
    });

    //Escuchar el mensaje dewl froent
    client.on("enviarMensaje", mensaje => {
        console.log( mensaje );
    });

    client.emit("bienvenido", {
        saludo: "Bienvenido, este es un mensaje desde el servidor",
        fecha: new Date()
    });
});

server.listen(4000, (error) => {
    if(error){
        console.log(error);
    }
    console.log("Conectado al servidor....");
});