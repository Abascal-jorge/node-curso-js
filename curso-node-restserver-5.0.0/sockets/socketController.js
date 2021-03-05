const { Socket } = require("socket.io");
const  { validarJwtCliente } = require("../helpers/index");
const { ChatMensajes } = require("../models/index");

const chatMensajes = new ChatMensajes();

const socketController = async ( socket = new Socket(), io ) => {
    const tokenCliente = socket.handshake.headers["x-token"];

    const usuario = await validarJwtCliente(tokenCliente);

    if( !usuario ){
        return socket.disconnect();
    }

    //Agregar el usuario conectado
    chatMensajes.conectarUsuario( usuario );

    io.emit("usuarios-activos",  { activos: chatMensajes.usuariosArr });

    //Eliminar usuario o mostrar que se desconecto 
    socket.on("disconnect", () => {
        chatMensajes.desconectarUsuario(usuario.id);
        socket.broadcast.emit("usuarios-activos",  { activos: chatMensajes.usuariosArr });
    });

    console.log("Se conecto \n" + usuario.nombre);

}

module.exports = {
    socketController
};