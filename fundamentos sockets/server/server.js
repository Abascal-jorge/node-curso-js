const express = require("express");
//const path = require("path");
const socketIO = require("socket.io");
const cors = require("cors");
const http = require("http");
const app = express();


//Habilitar cors
const opcionesCors = {
    origin: process.env.FRONTEND_URL
}
app.use( cors(opcionesCors) );
/////////////////

//const publicPath = path.resolve(__dirname, `../public`);
const port = process.env.PORT || 4000;

app.get("/usuario", (req, res) => {
    res.json({
        message: "Desde usuario get"
    });
});


//app.use(express.static(publicPath));

app.listen(4000, (error) => {
    if(error){
        console.log(error);
    }
    console.log("Conectado al servidor....");
});


/*Codigo a quitar

const server = http.createServer(app);


let io = socketIO(server);

io.on("connection", (client) => {
    console.log("hola");
});

*/