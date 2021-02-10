const { io } = require('../server');
const { TicketCreado } = require("../classes/ticket-control");


let claseTicket = new TicketCreado();


io.on('connection', (client) => {

   client.on("siguienteTicket", (data, callback) => {
       let ultimo = claseTicket.siguiente();
       callback(ultimo);
   },);

   client.broadcast.emit("ticketUltimo", {
       ultimo: claseTicket.ticketUltimo(),
       ultimos4: claseTicket.getUltimos4()
   });

    client.on("atenderTicket", (data, callback) => {

        if( !data.escritorio ){
            return callback({ 
                error: true,
                mensaje: "Escritorio es necesario"
            });
        }

        let ticketAtender = claseTicket.atenderTicket(data.escritorio);
        
        callback(ticketAtender);

        //Actualizatr notificar cambios en los ultimos 4
    });

});