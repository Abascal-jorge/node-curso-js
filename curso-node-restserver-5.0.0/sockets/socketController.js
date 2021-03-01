const { Socket } = require("socket.io");
const  { validarJwtCliente } = require("../helpers/index");

const socketController = async ( socket = new Socket() ) => {

    const tokenCliente = socket.handshake.headers["x-token"];

    const usuario = await validarJwtCliente(tokenCliente);

    if( !usuario ){
        return socket.disconnect();
    }

    console.log("Se conecto \n" + usuario.nombre);

    /*socket.on("disconnect", (client) => {
        console.log("Desconectado el cliente");
    });

    socket.on("Mensaje", (datos) => {
        console.log(datos);
    });*/

}

module.exports = {
    socketController
};