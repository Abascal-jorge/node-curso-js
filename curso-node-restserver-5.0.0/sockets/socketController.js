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
    io.on("desconectar-sesion", ( payload ) => {
        chatMensajes.desconectarUsuario( payload );
    });

    console.log("Se conecto \n" + usuario.nombre);

}

module.exports = {
    socketController
};