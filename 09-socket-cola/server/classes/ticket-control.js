const fs = require("fs");

class Ticket{
    constructor(numero, escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketCreado{

    constructor(){
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        let tickets = [];

        let data = require("../data/data.json");
        if( this.hoy === data.hoy){
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
        }else{
            this.reiniciarTicket();
        }
    }

    siguiente(){
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }

    ticketUltimo(){
        return `Ticket ${this.ultimo}`;
    }

    atenderTicket(escritorio){
        if(this.tickets.length === 0){
            return "No hay tickets...";
        }

        let numeroTicket = this.tickets[0].numero;
    }

    reiniciarTicket(){
        this.ultimo = 0;
        this.tickets = [];
        this.grabarArchivo();
    }

    grabarArchivo(){
        let info =  JSON.stringify({ ultimo: this.ultimo, hoy: this.hoy, tickets: this.tickets});
        fs.writeFileSync("./server/data/data.json", info);
    }
}

module.exports = {
    TicketCreado
}