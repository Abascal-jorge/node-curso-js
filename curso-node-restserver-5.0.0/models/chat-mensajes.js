class Mensaje{
    constructor( uid, nombre, mensaje ){
        this.uid = uid;
        this.nombre = nombre;
        this.mensaje = mensaje;
    }
}

class ChatMensajes {
    constructor(){
        this.mensajes = [];
        this.mensajesPrivado = [];
        this.usuarios = {};
    }

    get ultimos10(){
        this.mensajes = this.mensajes.splice(0, 10);
        return this.mensajes;
    }

    ultimosPrivados( uid, uidRemitente ){
        return this.mensajesPrivado.filter( menPrivado => menPrivado.uid === uid && menPrivado.uidRemitente === uidRemitente);
    }

    get usuariosArr(){
        return Object.values( this.usuarios );
    }

    enviarMensaje( uid, nombre, mensaje ){
        this.mensajes.unshift( new Mensaje(uid, nombre, mensaje) );
    }

    enviarMensajePrivado( uid, nombre, mensaje, uidRemitente){
        this.mensajesPrivado.unshift( { uid, de: nombre, mensaje, uidRemitente } );
    }

    conectarUsuario( usuario ){
        this.usuarios[usuario.id] = usuario; 
    }

    desconectarUsuario( id ){
        delete this.usuarios[id]
    }
}

module.exports = ChatMensajes;