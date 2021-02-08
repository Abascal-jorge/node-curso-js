let socket = io();

        //Uusario conectado
        socket.on("connect", () => {
            console.log("Conectando al servidor");
        });

        //Detectar una desconecion de un usuario
        socket.on("disconnect", () => {
            console.log("==============Usuario desconectado=====================");
        });

        //Emitir desde el cliente al servidor escucha
        socket.emit("enviarMensaje", {
            nombre: "Jorge Abascal Lopez!",
            edad: 25
        }, function(resp){
            console.log(resp);
        });

        socket.on("bienvenido", saludo => {
            console.log(saludo);
        });

        //Escuchar broadcast
        socket.on("enviarMensaje", (mensaje) => {
            console.log(mensaje);
        });
