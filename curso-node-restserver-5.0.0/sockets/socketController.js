const { isValidObjectId } = require("mongoose");
const { Socket } = require("socket.io");
const  { validarJwtCliente } = require("../helpers/index");
const { ChatMensajes } = require("../models/index");

const chatMensajes = new ChatMensajes();

const socketController = async ( socket  = new Socket(), io  ) => {
    //  = new Socket(), io 
    const tokenCliente = socket.handshake.headers["x-token"];

    const usuario = await validarJwtCliente(tokenCliente);

    if( !usuario ){
        return socket.disconnect();
    }

    //Agregar el usuario conectado
    chatMensajes.conectarUsuario( usuario );

    io.emit("usuarios-activos",  { activos: chatMensajes.usuariosArr });
    //socket.broadcast.emit("usuarios-activos",  { activos: chatMensajes.usuariosArr });

    //Eliminar usuario o mostrar que se desconecto 
    socket.on("disconnect", () => {
        chatMensajes.desconectarUsuario(usuario.id);
        io.emit("usuarios-activos",  { activos: chatMensajes.usuariosArr });
    });

    ////////////
    io.emit("recibir-mensajes", { mensajes: chatMensajes.ultimos10 });
    socket.on("mensaje-nuevo", datos => {
        const { uid, nombre, mensaje } = datos;
        chatMensajes.enviarMensaje( usuario.id, usuario.nombre, mensaje);
        io.emit("recibir-mensajes", { mensajes: chatMensajes.ultimos10 });
    });

    console.log("Se conecto \n" + usuario.nombre);
}

module.exports = {
    socketController
};