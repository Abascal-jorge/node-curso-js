const { io } = require("../server");


io.on("connection", (client) => {
    console.log("Cliente conectado");

    //Detectar una desconecion de un usuario
    client.on("disconnect", () => {
        console.log("===========Usuario desconectado===============");
    });

    //Escuchar el mensaje dewl froent
    client.on("enviarMensaje", (mensaje, callback) => {
        console.log(mensaje);

        client.broadcast.emit("enviarMensaje", mensaje);

    });

    /*
    if(mensaje.nombre){
            callback({
                resp: "Todo salio bien"
            });
        }else{
            callback({
                resp: "Todo salio Mall!!!!"
            });
        }
        console.log( mensaje );
    */

    client.emit("bienvenido", {
        saludo: "Bienvenido, este es un mensaje desde el servidor",
        fecha: new Date()
    });
});
