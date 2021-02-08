const { io } = require('../server');
const { TicketCreado } = require("../classes/ticket-control");


let claseTicket = new TicketCreado();


io.on('connection', (client) => {

   client.on("siguienteTicket", (data, callback) => {
       let ultimo = claseTicket.siguiente();
       callback(ultimo);
   },);

   client.emit("ticketUltimo", {
       ultimo: claseTicket.ticketUltimo()
    });

});