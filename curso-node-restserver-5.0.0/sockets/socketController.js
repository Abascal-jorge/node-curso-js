const { Socket } = require("socket.io");

const socketController = ( socket = new Socket() ) => {

    console.log("Usuario conectado al socket", socket.id);

    socket.on("disconnect", (client) => {
        console.log("Desconectado el cliente");
    });

    socket.on("Mensaje", (datos) => {
        console.log(datos);
    });

}

module.exports = {
    socketController
};